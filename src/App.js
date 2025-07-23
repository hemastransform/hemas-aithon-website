import React, { useRef, useEffect, useState } from 'react';

// --- BACKGROUND ANIMATION COMPONENTS ---

/**
 * @name NeuralNetwork
 * @description This component creates a dynamic, interactive neural network animation on an HTML canvas.
 * It simulates nodes (neurons) moving around and the connections (synapses) between them, which pulse with energy.
 * The animation is designed to be a visually engaging background that represents the concept of Artificial Intelligence.
 * It's performance-optimized by using requestAnimationFrame for smooth rendering.
 */
const NeuralNetwork = () => {
  // A ref to hold the canvas DOM element.
  const canvasRef = useRef(null);
  // A ref to hold the ID of the animation frame, so we can cancel it on cleanup.
  const animationRef = useRef();

  // The main effect hook that runs once when the component mounts.
  useEffect(() => {
    // Get the canvas element and its 2D rendering context.
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Function to resize the canvas to fill the entire window.
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize and event listener for future window resizing.
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Arrays to store the neural network's nodes and connections.
    const nodes = [];
    const connections = [];
    const nodeCount = 80; // The total number of nodes in the network.

    // --- Initialization ---
    // Create all the nodes with random initial positions, velocities, and properties.
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,       // Random horizontal position.
        y: Math.random() * canvas.height,      // Random vertical position.
        vx: (Math.random() - 0.5) * 0.8,       // Random horizontal velocity.
        vy: (Math.random() - 0.5) * 0.8,       // Random vertical velocity.
        energy: Math.random(),                 // Initial energy level for pulsing effect.
        pulsePhase: Math.random() * Math.PI * 2, // Random phase for the pulse animation.
        size: Math.random() * 3 + 1            // Random base size for the node.
      });
    }

    // Create connections between nodes that are close to each other.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the distance is less than a threshold, create a connection.
        if (distance < 150) {
          connections.push({
            nodeA: i, // Index of the first node.
            nodeB: j, // Index of the second node.
            strength: 1 - (distance / 150), // Connection strength based on distance.
            pulseOffset: Math.random() * Math.PI * 2 // Random offset for the connection's pulse.
          });
        }
      }
    }

    // --- Animation Loop ---
    let time = 0; // A counter to drive the animation's sine wave-based pulses.
    const animate = () => {
      // Use a semi-transparent fill to create a motion-blur effect.
      ctx.fillStyle = 'rgba(10, 16, 31, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.02; // Increment time for the next frame.

      // Update and draw each node.
      nodes.forEach((node) => {
        // Update the node's position based on its velocity.
        node.x += node.vx;
        node.y += node.vy;

        // Bounce the node off the edges of the canvas.
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Ensure nodes don't go out of bounds.
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update the node's energy using a sine wave for a pulsing effect.
        node.energy = (Math.sin(time + node.pulsePhase) + 1) / 2;

        // Draw the node's outer glow.
        const radius = node.size + node.energy * 2;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
        gradient.addColorStop(0, `rgba(20, 209, 190, ${0.8 * node.energy})`);
        gradient.addColorStop(0.5, `rgba(100, 255, 220, ${0.4 * node.energy})`);
        gradient.addColorStop(1, 'rgba(20, 209, 190, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw the node's core.
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * node.energy})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw each connection.
      connections.forEach(conn => {
        const nodeA = nodes[conn.nodeA];
        const nodeB = nodes[conn.nodeB];

        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only draw connections if they are within the threshold.
        if (distance < 150) {
          const opacity = conn.strength * (nodeA.energy + nodeB.energy) / 2;
          const pulse = Math.sin(time * 2 + conn.pulseOffset) * 0.3 + 0.7;

          // Create a gradient for the line to make it glow.
          const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          gradient.addColorStop(0, `rgba(255, 118, 1, ${opacity * pulse})`);
          gradient.addColorStop(0.5, `rgba(20, 209, 190, ${opacity * pulse * 1.2})`);
          gradient.addColorStop(1, `rgba(255, 118, 1, ${opacity * pulse})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1 + pulse;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();

          // Occasionally draw a "data packet" moving along the connection.
          if (Math.random() < 0.003) {
            const t = Math.random();
            const packetX = nodeA.x + dx * t;
            const packetY = nodeA.y + dy * t;

            ctx.fillStyle = `rgba(100, 255, 220, ${opacity})`;
            ctx.beginPath();
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      // Request the next frame of the animation.
      animationRef.current = requestAnimationFrame(animate);
    };
    // Start the animation loop.
    animate();

    // Cleanup function to run when the component unmounts.
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs only once.

  // Render the canvas element.
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }} // Blend mode for a cool visual effect against other layers.
    />
  );
};

/**
 * @name CodeParticles
 * @description Renders floating, rotating particles that look like code symbols (0, 1, {}, etc.).
 * This adds to the digital, "in-the-code" aesthetic of the background.
 * Includes a "glitch" effect where particles occasionally flicker to a different symbol.
 */
const CodeParticles = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // An array of symbols to be used as particles. Heavily weighted with '0' and '1'.
    const codeSymbols = ['AR', 'VR', 'IOT', 'Vibe Coding', 'CV', 'AI Agents','Big Data','Data','0', '1', '0', '1', 'NN','0', '1', '0', '1', '0', '1', '{', '}', '<>', 'AI', '0', '1', 'ML', 'GPT', 'NLP','Python', 'Java', 'R'];
    const particles = [];
    const particleCount = 100; // Increased count for a denser binary field.

    // Initialize all particles with random properties.
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        opacity: Math.random() * 0.7 + 0.3,
        size: Math.random() * 12 + 8,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        glitchTime: 0, // A countdown timer for the glitch effect.
        originalSymbol: ''
      });
      particles[i].originalSymbol = particles[i].symbol; // Store the original symbol to revert after glitch.
    }

    // The animation loop.
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas each frame.

      particles.forEach(particle => {
        // Update particle physics.
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Wrap particles around the screen for a continuous effect.
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Handle the glitch effect logic.
        particle.glitchTime -= 0.016;
        if (particle.glitchTime <= 0 && Math.random() < 0.002) {
          particle.glitchTime = 0.5; // Start a glitch.
          particle.symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        }
        if (particle.glitchTime <= 0) {
          particle.symbol = particle.originalSymbol; // End the glitch.
        }

        // Draw the particle.
        ctx.save(); // Save the current canvas state.
        ctx.translate(particle.x, particle.y); // Move origin to the particle's position.
        ctx.rotate(particle.rotation); // Rotate the canvas.

        // Add a glow effect, changing color during a glitch.
        ctx.shadowColor = particle.glitchTime > 0 ? '#ff7601' : '#14d1be';
        ctx.shadowBlur = 10;

        // Set the particle's color, changing during a glitch.
        ctx.fillStyle = particle.glitchTime > 0
           ? `rgba(255, 118, 1, ${particle.opacity})`
           : `rgba(20, 209, 190, ${particle.opacity})`;
        ctx.font = `${particle.size}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.symbol, 0, 0); // Draw the symbol at the new origin.

        ctx.restore(); // Restore the canvas state.
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

/**
 * @name MatrixRain
 * @description Creates the classic "Matrix" style digital rain effect.
 * This version is modified to use only '0's and '1's for a pure binary feel,
 * reinforcing the theme requested by the user.
 */
const MatrixRain = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = canvas.width / fontSize; // Calculate how many columns of text can fit.
    const drops = []; // An array to store the y-position of each drop in a column.

    // Initialize each drop at a random vertical position.
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const chars = '01'; // The character set is restricted to binary.

    const draw = () => {
      // Draw a semi-transparent black rectangle to create the fading trail effect.
      ctx.fillStyle = 'rgba(10, 16, 31, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';

      // Loop through each column.
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const opacity = 1 - (drops[i] / canvas.height); // Fade out characters as they fall.
        ctx.fillStyle = `rgba(20, 209, 190, ${Math.max(0.1, opacity)})`;

        ctx.fillText(char, i * fontSize, drops[i]); // Draw the character.

        // If a drop has reached the bottom, randomly reset it to the top.
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += fontSize; // Move the drop down for the next frame.
      }
    };

    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.3 }}
    />
  );
};

/**
 * @name GeometricShapes
 * @description Renders large, faint, rotating geometric shapes (triangles, squares, etc.) in the background.
 * This adds a layer of subtle complexity and structure to the otherwise chaotic background animations.
 */
const GeometricShapes = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const shapes = [];
    const shapeCount = 15;

    // Initialize shapes with random properties.
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        type: Math.floor(Math.random() * 4), // 0: triangle, 1: square, etc.
        opacity: Math.random() * 0.1 + 0.05,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    // Helper functions to draw different shapes.
    const drawTriangle = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.restore();
    };
    const drawSquare = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };
    const drawHexagon = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = Math.cos(angle) * size / 2;
        const py = Math.sin(angle) * size / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      shapes.forEach(shape => {
        shape.rotation += shape.rotationSpeed;
        const pulseFactor = Math.sin(time + shape.pulse) * 0.3 + 1;
        const currentSize = shape.size * pulseFactor;

        // Create a radial gradient for a soft, glowing stroke.
        const gradient = ctx.createRadialGradient(shape.x, shape.y, 0, shape.x, shape.y, currentSize);
        gradient.addColorStop(0, `rgba(20, 209, 190, ${shape.opacity})`);
        gradient.addColorStop(0.7, `rgba(255, 118, 1, ${shape.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(20, 209, 190, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        // Draw the shape based on its type.
        switch (shape.type) {
          case 0: drawTriangle(shape.x, shape.y, currentSize, shape.rotation); break;
          case 1: drawSquare(shape.x, shape.y, currentSize, shape.rotation); break;
          case 2: drawHexagon(shape.x, shape.y, currentSize, shape.rotation); break;
          case 3: ctx.beginPath(); ctx.arc(shape.x, shape.y, currentSize / 2, 0, Math.PI * 2); break;
          default: break;
        }
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }} />;
};


/**
 * @name EnergyWaves
 * @description Draws multiple layers of sine waves that move and distort over time.
 * This creates a feeling of flowing energy or data streams in the background.
 */
const EnergyWaves = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      // Draw multiple wave layers for a parallax effect.
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        // Combine multiple sine waves for a more complex and organic shape.
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height / 2 +
             Math.sin((x * 0.005) + time + (layer * 0.5)) * 30 +
            Math.sin((x * 0.01) + time * 0.7 + (layer * 0.3)) * 15 +
            Math.sin((x * 0.02) + time * 0.5 + (layer * 0.7)) * 8;
          ctx.lineTo(x, y);
        }
        // Use a gradient for the wave's stroke color.
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(20, 209, 190, ${0.1 - layer * 0.02})`);
        gradient.addColorStop(0.5, `rgba(255, 118, 1, ${0.15 - layer * 0.03})`);
        gradient.addColorStop(1, `rgba(20, 209, 190, ${0.1 - layer * 0.02})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />;
};


/**
 * @name FuturisticAiBackground
 * @description This is the main container component for all the background animations.
 * It layers all the canvas animations on top of each other and adds some CSS-based effects
 * like gradients and scanlines to complete the futuristic look.
 */
const FuturisticAiBackground = () => {
  return (
    // A fixed container that fills the entire viewport and stays in the background.
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
      {/* Animated gradient overlay for color shifting */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 118, 1, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(20, 209, 190, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(100, 255, 220, 0.05) 0%, transparent 50%)
          `,
          animation: 'gradientShift 20s ease-in-out infinite alternate'
        }}
      />
      {/* The canvas animation components, layered by their z-index and opacity. */}
      <MatrixRain />
      <EnergyWaves />
      <GeometricShapes />
      <NeuralNetwork />
      <CodeParticles />
      {/* A scanline effect overlay to mimic a CRT monitor. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(20, 209, 190, 0.02) 2px,
            rgba(20, 209, 190, 0.02) 4px
          )`,
          animation: 'scanlines 2s linear infinite'
        }}
      />
    </div>
  );
};


// --- CONTENT COMPONENTS & DATA ---

// SVG icon components for use throughout the site.
const IconBrainCircuit = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.73c0 .27.16.59.67.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z"/></svg>;
const IconAutomation = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 8V4H8"/><rect x="4" y="12" width="8" height="8" rx="1"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M17 12h-2"/><path d="M17 22v-4h-2"/><path d="M12 17H4"/><path d="M12 12v-2h4v-2h-4V4H8"/></svg>;
const IconExperience = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconFoundation = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 20.5L4 16V8l8-4 8 4v8Z"/><path d="M4 8l8 4 8-4"/><path d="M12 12v8.5"/></svg>;
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const PowerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.36 6.64a9 9 0 1 1-12.72 0"/></svg>;


// Data arrays for different sections of the site. This keeps content separate from presentation.
const techPillars = [
    { icon: <IconBrainCircuit />, title: "Core Intelligence & Models", description: "Build with, fine-tune, or create LLMs/SLMs. Develop advanced computer vision solutions that see and understand the world.", color: "teal" },
    { icon: <IconAutomation />, title: "Systems & Automation", description: "Design autonomous AI agents and agentic workflows. Create digital twins to simulate and optimize real-world business processes.", color: "sky" },
    { icon: <IconExperience />, title: "Human-Computer Interaction", description: "Build immersive AR/VR experiences that merge digital insights with reality. Develop the final web and mobile apps that deliver the magic.", color: "orange" },
    { icon: <IconFoundation />, title: "Foundational Inputs & Methodology", description: "Utilize IoT data from physical sensors to feed real-time information into your AI. Embrace 'Vibe Coding' for rapid, AI-assisted prototyping.", color: "rose" },
];
const whyJoinData = [
    { title: "Build What Matters", description: "Tackle real-world challenges from Hemas's Healthcare, Consumer, and Mobility sectors. Your code could become a high-potential prototype that shapes our future.", size: "large" },
    { title: "Launch Your Career", description: "This is a direct talent pipeline. Impress us, and you'll be on the fast track for internships and recruitment into Hemas's most critical tech roles.", size: "small" },
    { title: "Wield Cutting-Edge Tech", description: "Get hands-on with the tools defining the future—Generative AI, agentic systems, IoT, and AR/VR, all backed by the power of Microsoft Azure.", size: "small" },
];
const scheduleData = [
    { phase: "Phase 1", date: "Jul 28 - Aug 22", title: "University Outreach & Applications", description: "The official application process is launched. Aspiring participants can apply to be part of the initial cohort." },
    { phase: "Phase 2", date: "Aug 18 - Sep 5", title: "Participant Selection", description: "Applications are reviewed, and the top 50 students are selected and invited to the Hemas Immersion Day." },
    { phase: "Phase 3", date: "Sep 8 - Sep 19", title: "Immersion & Ideation", description: "Selected participants join the online Immersion Day and then compete in the one-week 'Agent Blueprint' challenge." },
    { phase: "Phase 4", date: "Sep 22 - Oct 1", title: "The AI-thon Finale", description: "The top 6 teams are selected to build their prototypes in a final, 24-hour hackathon event, followed by judging and awards." },
];
const faqData = [
  { question: "What is the 'Discovery & Build' framework?", answer: "Instead of giving you a pre-defined problem, we immerse you in our business challenges. You get the 'structured freedom' to discover an opportunity and design your own AI solution, making your project highly relevant and innovative." },
  { question: "What is the team size?", answer: "Teams can have up to 5 members. You must register as a team. The registration form will require the name and NIC for each member." },
  { question: "What kind of solutions are you looking for?", answer: "We are looking for high-potential, working AI prototypes that directly address challenges or opportunities within Hemas's Healthcare, Consumer Brands, and Mobility sectors, based on the Technology Pillars." },
  { question: "What will I gain from participating?", answer: "You will tackle real-world business problems, get hands-on experience with cutting-edge tech, and get noticed by our senior leadership. This is a direct pathway for exceptional participants to our internship and recruitment programs." },
];

/**
 * @name AnimatedText
 * @description A component that animates text by fading in each character sequentially.
 * This creates a dynamic and engaging "typing" effect for headlines.
 */
const AnimatedText = ({ text, className, delay = 0 }) => {
    return (
        <span className={className}>
            {text.split("").map((char, index) => (
                <span
                  key={index}
                  className="animate-fade-in-up"
                  // Each character's animation is delayed slightly more than the last.
                  style={{ animationDelay: `${delay + index * 0.05}s` }}
                >
                    {char === " " ? "\u00A0" : char} {/* Render non-breaking space for spaces */}
                </span>
            ))}
        </span>
    );
};

/**
 * @name useScrollReveal
 * @description A custom React hook that uses the Intersection Observer API
 * to add a 'visible' class to elements when they scroll into view.
 * This is used for the fade-in-on-scroll effect for various sections.
 */
const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible.
    revealElements.forEach(el => observer.observe(el));
    // Cleanup function to unobserve elements when the component unmounts.
    return () => revealElements.forEach(el => observer.unobserve(el));
  }, []);
};

/**
 * @name Header
 * @description The main navigation header for the website.
 * It becomes "sticky" and changes style slightly when the user scrolls down the page.
 */
function Header({ scrollTo, isScrolled }) {
  // A function to create a ripple effect on button clicks.
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) { ripple.remove(); }
    button.appendChild(circle);
  };
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'top-4' : ''}`}>
      <nav className={`container mx-auto flex justify-between items-center transition-all duration-300 bg-black/30 backdrop-blur-md border border-slate-800 ${isScrolled ? 'rounded-full py-3 px-8 shadow-2xl shadow-teal-500/10' : 'py-4 px-6'}`}>
        {/* Logo */}
        <div className="text-2xl font-bold text-white">Hemas <span className="text-teal-400" style={{textShadow: '0 0 8px rgba(20, 209, 190, 0.7)'}}>AI-thon</span></div>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">About</a>
          <a href="#pillars" onClick={(e) => scrollTo(e, 'pillars')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">Tech Pillars</a>
          <a href="#timeline" onClick={(e) => scrollTo(e, 'timeline')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">Timeline</a>
          <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">FAQ</a>
        </div>
        {/* Register Button */}
        <a href="#register" onClick={(e) => { scrollTo(e, 'register'); createRipple(e); }} className="group relative overflow-hidden bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20">
          <span className="button-glare"></span>
          Register Now
        </a>
      </nav>
    </header>
  );
}

/**
 * @name Hero
 * @description The main "hero" section at the top of the page.
 * It features the main headline and a unique, interactive call-to-action button
 * styled to look like a computer terminal.
 */
function Hero({ scrollTo }) {
  return (
    <section className="relative text-white pt-48 pb-24 md:pt-64 md:pb-40">
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Animated headlines */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          <AnimatedText text="Code the Unimaginable." className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400" />
          <AnimatedText text="Invent with Intelligence." className="block text-teal-400 title-glow mt-2" delay={0.5} />
        </h1>
        {/* Introductory paragraph */}
        <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '1s'}}>
          The Hemas AI-thon is your arena to innovate. We bring the real-world business challenges; you bring the code, the creativity, and the ambition to build what's next. This is more than a competition—it's your entry into the world of applied AI.
        </p>
        {/* The new creative call-to-action button */}
        <div className="mt-12 animate-fade-in-up flex justify-center" style={{animationDelay: '1.2s'}}>
            <button onClick={(e) => scrollTo(e, 'register')} className="futuristic-cta group">
                <span className="cta-icon"><PowerIcon /></span>
                <span className="cta-text">Register Now</span>
            </button>
        </div>
      </div>
    </section>
  );
}

function About() {
    return (
        <section className="py-20 bg-black/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white scroll-reveal title-glow">The Art of the Possible</h2>
                    <p className="mt-4 text-lg text-slate-300 max-w-4xl mx-auto scroll-reveal" style={{transitionDelay: '200ms'}}>We are strategically pivoting from a traditional hackathon to an innovative **"Discovery & Build"** framework. We immerse the brightest university talent in the world of Hemas—our businesses and strategic ambitions. Then, we challenge you to identify unique opportunities and design your own AI solutions, ensuring projects are not only technically brilliant but also rooted in genuine business insight.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="glass-card rounded-2xl p-8 text-center scroll-reveal" style={{transitionDelay: '300ms'}}>
                        <h3 className="text-2xl font-bold text-teal-400 mb-4">Structured Freedom</h3>
                        <p className="text-slate-300">Our core philosophy is to provide a 'scaffolding' that guides your creativity towards areas of high business value, while giving you complete freedom to build what you envision within that structure.</p>
                    </div>
                    <div className="glass-card rounded-2xl p-8 text-center scroll-reveal" style={{transitionDelay: '400ms'}}>
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">Vision-First, Not Pain-Point First</h3>
                        <p className="text-slate-300">You won't be solving small, isolated problems. You'll be tackling strategic challenges derived from the future ambitions of our business units, making your work truly impactful.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WhyJoin() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white scroll-reveal">This is Your Gateway.</h2>
          <p className="mt-4 text-lg text-slate-400 scroll-reveal" style={{transitionDelay: '200ms'}}>Why this is the only tech event that matters for your career this year.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyJoinData.map((item, index) => (
            <div key={index} className={`glass-card rounded-2xl p-8 text-center flex flex-col justify-center items-center scroll-reveal`} style={{transitionDelay: `${300 + index * 100}ms`}}>
              <div>
                <h3 className="text-2xl font-bold text-teal-400 mb-4">{item.title}</h3>
                <p className="text-slate-300 text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, className, style }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function TechPillars() {
  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white scroll-reveal">Explore the Technology Pillars</h2>
          <p className="mt-4 text-lg text-slate-400 scroll-reveal" style={{transitionDelay: '200ms'}}>Your challenge is to build an innovative solution leveraging one or more of these core domains.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techPillars.map((pillar, index) => (
            <TiltCard key={pillar.title} className={`scroll-reveal`} style={{transitionDelay: `${300 + index * 100}ms`}}>
              <div className={`glass-card h-full rounded-2xl p-6 flex flex-col items-center text-center border-t-4 border-${pillar.color}-500`}>
                <div className={`text-${pillar.color}-400 mb-4`}>{pillar.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 text-sm flex-grow">{pillar.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetitionTimeline() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-16 scroll-reveal">Competition Timeline</h2>
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-slate-700 scroll-reveal"></div>
                    {scheduleData.map((item, index) => (
                        <div key={index} className="relative mb-12 flex items-center w-full scroll-reveal" style={{transitionDelay: `${200 + index * 100}ms`}}>
                            <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                {index % 2 === 0 && ( <> <h3 className="text-xl font-bold text-white">{item.title}</h3> <p className="text-orange-400">{item.date}</p> <p className="text-slate-400 mt-2 text-sm">{item.description}</p> </> )}
                            </div>
                            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-teal-500 rounded-full border-4 border-gray-900 flex items-center justify-center font-bold text-white z-10"> {index + 1} </div>
                            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 !== 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                                <div className="md:hidden mb-2"> <h3 className="text-xl font-bold text-white">{item.title}</h3> <p className="text-orange-400">{item.date}</p></div>
                                <p className="text-slate-400 mt-2 text-sm md:hidden">{item.description}</p>
                                {index % 2 !== 0 && ( <div className="hidden md:block"> <h3 className="text-xl font-bold text-white">{item.title}</h3> <p className="text-orange-400">{item.date}</p> <p className="text-slate-400 mt-2 text-sm">{item.description}</p> </div> )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Prizes() {
  return (
    <section id="prizes" className="py-20 bg-black/20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4 scroll-reveal">The Rewards for Visionaries</h2>
        <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto scroll-reveal" style={{transitionDelay: '200ms'}}>We're rewarding groundbreaking ideas and flawless execution with a significant prize pool and unparalleled opportunities.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="glass-card rounded-2xl p-8 scroll-reveal" style={{transitionDelay: '300ms'}}> <p className="text-orange-400 font-bold text-lg">RUNNER-UP</p> <h3 className="text-4xl font-bold text-white mt-2">LKR 100,000</h3> </div>
            <div className="glass-card rounded-2xl p-8 border-2 border-teal-400 shadow-2xl shadow-teal-500/20 transform md:scale-105 scroll-reveal" style={{transitionDelay: '400ms'}}> <p className="text-teal-400 font-bold text-lg">GRAND PRIZE</p> <h3 className="text-5xl font-extrabold text-white mt-2">LKR 200,000</h3> <p className="text-slate-300 mt-1">AI-thon Champions</p> </div>
            <div className="glass-card rounded-2xl p-8 scroll-reveal" style={{transitionDelay: '500ms'}}> <p className="text-orange-400 font-bold text-lg">SPECIAL AWARD</p> <h3 className="text-4xl font-bold text-white mt-2">LKR 200,000</h3> <p className="text-slate-300 mt-1">Most Innovative Prototype</p> </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-700/50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left py-4 flex justify-between items-center transition-colors hover:text-teal-400">
        <span className="text-lg font-medium">{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-teal-400"><path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="pb-4 pr-8 pt-2 text-slate-400"> {item.answer} </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12 scroll-reveal">Your Questions, Answered.</h2>
        <div className="max-w-3xl mx-auto p-4 rounded-lg glass-card scroll-reveal" style={{transitionDelay: '200ms'}}>
          {faqData.map((item, index) => ( <FaqItem key={index} item={item} /> ))}
        </div>
      </div>
    </section>
  );
}

const Registration = React.forwardRef(({ qrCodeUrl, formUrl }, ref) => {
    return (
        <section id="register" ref={ref} className="py-24">
            <div className="container mx-auto px-6">
                <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto scroll-reveal">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Your Mission Starts Now.</h2>
                            <p className="mt-4 text-lg text-slate-300"> Assemble your team of up to 5 innovators. Scan the QR code or click the button to access the official registration portal. Spots are limited. </p>
                            <a href={formUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center justify-center w-full md:w-auto py-4 px-8 border border-transparent rounded-full shadow-lg shadow-teal-500/30 text-lg font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105">
                                Open Registration Portal
                                <span className="ml-3"> <IconExternalLink /> </span>
                            </a>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-slate-900/50 rounded-lg">
                            <img src={qrCodeUrl} alt="QR Code for Registration" className="rounded-md" />
                            <p className="text-sm text-slate-400 mt-4 text-center">Scan with your mobile to register</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

function Footer() {
    return (
        <footer className="bg-black/30 border-t border-slate-800 relative z-10">
            <div className="container mx-auto px-6 py-8 text-center text-slate-500">
                <p>&copy; {new Date().getFullYear()} Hemas Holdings PLC. An Initiative by the Transformation Team.</p>
                <p className="text-sm mt-2">Forge the future. Build with purpose.</p>
            </div>
        </footer>
    );
}

/**
 * @name App
 * @description This is the root component of the entire application.
 * It orchestrates the layout, brings together all the different sections (Header, Hero, About, etc.),
 * and manages the overall state and logic, such as smooth scrolling and scroll-triggered animations.
 */
export default function App() {
  // Refs to different sections for smooth scrolling.
  const refs = {
    pillars: useRef(null), about: useRef(null), timeline: useRef(null),
    faq: useRef(null), register: useRef(null),
  };

  // Function to smoothly scroll to a section when a nav link is clicked.
  const scrollTo = (event, id) => {
    event.preventDefault();
    if (refs[id] && refs[id].current) {
        refs[id].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Static data for the registration form and QR code.
  const registrationFormUrl = "https://www.cognitoforms.com/HemasTransformation1/HemasAIthonOfficialTeamRegistration";
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(registrationFormUrl)}&bgcolor=111827&color=e2e8f0&qzone=1`;

  // Initialize the scroll-reveal hook.
  useScrollReveal();

  // State to track if the user has scrolled down the page.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Global styles and keyframe animations for the entire app */}
      <style>{`
        body {
            background-color: #0a101f;
            font-family: 'Poppins', sans-serif;
        }
        @keyframes gradientShift {
          0% { filter: hue-rotate(0deg); transform: scale(1) rotate(0deg); }
          50% { filter: hue-rotate(90deg); transform: scale(1.05) rotate(1deg); }
          100% { filter: hue-rotate(180deg); transform: scale(1) rotate(0deg); }
        }
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes aurora { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .aurora-bg {
          background: radial-gradient(ellipse at top, rgba(20, 209, 190, 0.1), transparent 50%),
                      radial-gradient(ellipse at bottom, rgba(255, 118, 1, 0.1), transparent 50%);
          animation: aurora 20s ease infinite;
        }
        .glass-card {
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .glass-card:hover {
          border-color: rgba(20, 209, 190, 0.5);
          box-shadow: 0 0 20px rgba(20, 209, 190, 0.1);
        }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { display: inline-block; opacity: 0; animation: fade-in-up 0.6s forwards; }
        .scroll-reveal { opacity: 0; transform: translateY(30px) scale(0.98); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .scroll-reveal.visible { opacity: 1; transform: translateY(0) scale(1); }
        
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.7);
        }
        .button-glare {
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-25deg);
          transition: left 0.75s;
        }
        .group:hover .button-glare { left: 150%; }
        
        /* --- New Highlighting and Button Styles --- */

        @keyframes pulse-glow {
            0%, 100% { text-shadow: 0 0 15px rgba(20, 209, 190, 0.7), 0 0 25px rgba(20, 209, 190, 0.5); }
            50% { text-shadow: 0 0 25px rgba(20, 209, 190, 1), 0 0 40px rgba(20, 209, 190, 0.7); }
        }

        .title-glow {
            animation: pulse-glow 4s ease-in-out infinite;
        }

        .futuristic-cta {
            position: relative;
            display: inline-flex;
            align-items: center;
            padding: 1rem 2.5rem;
            font-size: 1.125rem;
            font-weight: 700;
            color: #e2e8f0; /* slate-200 */
            background-color: transparent;
            border: 2px solid #14d1be; /* teal-400 */
            clip-path: polygon(90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%, 0 0);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .futuristic-cta:hover {
            background-color: rgba(20, 209, 190, 0.1);
            box-shadow: 0 0 25px rgba(20, 209, 190, 0.5);
            color: #fff;
        }
        
        .futuristic-cta .cta-icon {
            margin-right: 0.75rem;
            transition: transform 0.3s ease;
        }

        .futuristic-cta:hover .cta-icon {
            transform: rotate(360deg) scale(1.1);
        }
      `}</style>
      {/* Main container for the app */}
      <div className="text-slate-300 antialiased overflow-x-hidden">
        {/* The main background animation component */}
        <FuturisticAiBackground />
        
        {/* The site header */}
        <Header scrollTo={scrollTo} isScrolled={isScrolled} />

        {/* The main content area where all sections are rendered */}
        <main className="relative z-10">
          <Hero scrollTo={scrollTo} />
          <div ref={refs.about}><About /></div>
          <WhyJoin />
          <div ref={refs.pillars}><TechPillars /></div>
          <div ref={refs.timeline}><CompetitionTimeline /></div>
          <Prizes />
          <div ref={refs.faq}><FAQ /></div>
          <Registration qrCodeUrl={qrCodeApiUrl} formUrl={registrationFormUrl} ref={refs.register} />
        </main>
        
        {/* The site footer */}
        <Footer />
      </div>
    </>
  );
}
