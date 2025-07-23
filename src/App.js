import React, { useState, useRef } from 'react';

// --- SVG Icon Components for a futuristic feel ---
const IconBrainCircuit = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.73c0 .27.16.59.67.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z"/></svg>;
const IconAutomation = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 8V4H8"/><rect x="4" y="12" width="8" height="8" rx="1"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M17 12h-2"/><path d="M17 22v-4h-2"/><path d="M12 17H4"/><path d="M12 12v-2h4v-2h-4V4H8"/></svg>;
const IconExperience = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconFoundation = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 20.5L4 16V8l8-4 8 4v8Z"/><path d="M4 8l8 4 8-4"/><path d="M12 12v8.5"/></svg>;
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

// --- Data for the site ---
const techPillars = [
    { icon: <IconBrainCircuit />, title: "Core Intelligence & Models", description: "Build with, fine-tune, or create LLMs/SLMs. Develop advanced computer vision solutions that see and understand the world.", color: "teal" },
    { icon: <IconAutomation />, title: "Systems & Automation", description: "Design autonomous AI agents and agentic workflows. Create digital twins to simulate and optimize real-world business processes.", color: "sky" },
    { icon: <IconExperience />, title: "Human-Computer Interaction", description: "Build immersive AR/VR experiences that merge digital insights with reality. Develop the final web and mobile apps that deliver the magic.", color: "orange" },
    { icon: <IconFoundation />, title: "Foundational Inputs & Methodology", description: "Utilize IoT data from physical sensors to feed real-time information into your AI. Embrace 'Vibe Coding' for rapid, AI-assisted prototyping.", color: "rose" },
];

const scheduleData = [
    { phase: "Phase 1", date: "Jul 28 - Aug 22", title: "University Outreach & Applications", description: "The official application process is launched. Aspiring participants can apply to be part of the initial cohort." },
    { phase: "Phase 2", date: "Aug 18 - Sep 5", title: "Participant Selection", description: "Applications are reviewed, and the top 50 students are selected and invited to the Hemas Immersion Day." },
    { phase: "Phase 3", date: "Sep 8 - Sep 19", title: "Immersion & Ideation", description: "Selected participants join the online Immersion Day and then compete in the one-week 'Agent Blueprint' challenge." },
    { phase: "Phase 4", date: "Sep 22 - Oct 1", title: "The AI-thon Finale", description: "The top 6 teams are selected to build their prototypes in a final, 24-hour hackathon event, followed by judging and awards." },
];

const faqData = [
  {
    question: "What is the 'Discovery & Build' framework?",
    answer: "Instead of giving you a pre-defined problem, we immerse you in our business challenges. You get the 'structured freedom' to discover an opportunity and design your own AI solution, making your project highly relevant and innovative.",
  },
  {
    question: "What is the team size?",
    answer: "Teams can have up to 5 members. You must register as a team. The registration form will require the name and NIC for each member.",
  },
  {
    question: "What kind of solutions are you looking for?",
    answer: "We are looking for high-potential, working AI prototypes that directly address challenges or opportunities within Hemas's Healthcare, Consumer Brands, and Mobility sectors, based on the Technology Pillars.",
  },
  {
    question: "What will I gain from participating?",
    answer: "You will tackle real-world business problems, get hands-on experience with cutting-edge tech, and get noticed by our senior leadership. This is a direct pathway for exceptional participants to our internship and recruitment programs.",
  },
];


// --- Main App Component ---
export default function App() {
  const refs = {
    pillars: useRef(null),
    about: useRef(null),
    timeline: useRef(null),
    faq: useRef(null),
    register: useRef(null),
  };

  const scrollTo = (event, id) => {
    event.preventDefault();
    refs[id].current?.scrollIntoView({ behavior: 'smooth' });
  };

  // The new Cognito Forms registration URL
  const registrationFormUrl = "https://www.cognitoforms.com/HemasTransformation1/HemasAIthonOfficialTeamRegistration";
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(registrationFormUrl)}&bgcolor=0a101f&color=e2e8f0&qzone=1`;

  return (
    <div style={{backgroundColor: '#0a101f', fontFamily: "'Poppins', sans-serif"}} className="text-slate-300 antialiased">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 z-0"></div>
      
      <Header scrollTo={scrollTo} />

      <main className="relative z-10">
        <Hero scrollTo={scrollTo} />
        <div ref={refs.about}><About /></div>
        <div ref={refs.pillars}><TechPillars /></div>
        <div ref={refs.timeline}><CompetitionTimeline /></div>
        <Prizes />
        <div ref={refs.faq}><FAQ /></div>
        <Registration qrCodeUrl={qrCodeApiUrl} formUrl={registrationFormUrl} ref={refs.register} />
      </main>
      
      <Footer />
    </div>
  );
}

// --- Re-imagined Components ---

function Header({ scrollTo }) {
  return (
    <header className="bg-black/30 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Hemas <span className="text-teal-400" style={{textShadow: '0 0 8px rgba(20, 209, 190, 0.7)'}}>AI-thon</span></div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">About</a>
          <a href="#pillars" onClick={(e) => scrollTo(e, 'pillars')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">Tech Pillars</a>
          <a href="#timeline" onClick={(e) => scrollTo(e, 'timeline')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">Timeline</a>
          <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="text-slate-300 hover:text-teal-400 transition-colors duration-300 font-medium">FAQ</a>
        </div>
        <a href="#register" onClick={(e) => scrollTo(e, 'register')} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20">
          Register Now
        </a>
      </nav>
    </header>
  );
}

function Hero({ scrollTo }) {
  return (
    <section className="relative text-white py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Code the Unimaginable.</span>
          <span className="block text-teal-400 glow-teal mt-2">Launch Your Future.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          The Hemas AI-thon is not just a hackathon. It's a high-velocity launchpad for Sri Lanka's most ambitious student innovators. We provide the challenges, the tech, and the platform. You bring the vision.
        </p>
        <button onClick={(e) => scrollTo(e, 'register')} className="mt-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-2xl hover:shadow-teal-500/40 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-xl">
          Apply to Join the Vanguard
        </button>
      </div>
    </section>
  );
}

function About() {
    return (
        <section className="py-20 bg-black/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white">From Ideas to Implementation.</h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-4xl mx-auto">We are strategically pivoting from a traditional hackathon to an innovative **"Discovery & Build"** framework. We will first immerse the brightest university talent in the world of Hemas—our businesses and strategic ambitions. Then, we will challenge you to identify unique opportunities and design your own AI solutions, ensuring projects are not only technically brilliant but also rooted in genuine business insight.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="glass-card rounded-2xl p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl hover:shadow-teal-500/10">
                        <h3 className="text-2xl font-bold text-teal-400 mb-4">Structured Freedom</h3>
                        <p className="text-slate-300">Our core philosophy is to provide a 'scaffolding' that guides your creativity towards areas of high business value, while giving you complete freedom to build what you envision within that structure.</p>
                    </div>
                    <div className="glass-card rounded-2xl p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">Vision-First, Not Pain-Point First</h3>
                        <p className="text-slate-300">You won't be solving small, isolated problems. You'll be tackling strategic challenges derived from the future ambitions of our business units, making your work truly impactful.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TechPillars() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Explore the Technology Pillars</h2>
          <p className="mt-4 text-lg text-slate-400">Your challenge is to build an innovative solution leveraging one or more of these core domains.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techPillars.map((pillar) => (
            <div key={pillar.title} className={`glass-card rounded-2xl p-6 flex flex-col items-center text-center border-t-4 border-${pillar.color}-500`}>
              <div className={`text-${pillar.color}-400 mb-4`}>{pillar.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-slate-400 text-sm flex-grow">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetitionTimeline() {
    return (
        <section className="py-20 bg-black/20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-16">Competition Timeline</h2>
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-slate-700"></div>
                    {scheduleData.map((item, index) => (
                        <div key={index} className="relative mb-12 flex items-center w-full">
                            <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                {index % 2 === 0 && (
                                    <>
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        <p className="text-orange-400">{item.date}</p>
                                        <p className="text-slate-400 mt-2 text-sm">{item.description}</p>
                                    </>
                                )}
                            </div>
                            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-teal-500 rounded-full border-4 border-gray-900 flex items-center justify-center font-bold text-white z-10">
                                {index + 1}
                            </div>
                            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 !== 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                                <div className="md:hidden mb-2">
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-orange-400">{item.date}</p>
                                </div>
                                <p className="text-slate-400 mt-2 text-sm md:hidden">{item.description}</p>
                                {index % 2 !== 0 && (
                                     <div className="hidden md:block">
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        <p className="text-orange-400">{item.date}</p>
                                        <p className="text-slate-400 mt-2 text-sm">{item.description}</p>
                                    </div>
                                )}
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
    <section id="prizes" className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">The Rewards for Visionaries</h2>
        <p className="text-center text-slate-400 mb-12 max-w-3xl mx-auto">We're rewarding groundbreaking ideas and flawless execution with a significant prize pool and unparalleled opportunities.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="glass-card rounded-2xl p-8">
                <p className="text-orange-400 font-bold text-lg">RUNNER-UP</p>
                <h3 className="text-4xl font-bold text-white mt-2">LKR 100,000</h3>
            </div>
            <div className="glass-card rounded-2xl p-8 border-2 border-teal-400 shadow-2xl shadow-teal-500/20 transform scale-105">
                <p className="text-teal-400 font-bold text-lg">GRAND PRIZE</p>
                <h3 className="text-5xl font-extrabold text-white mt-2">LKR 200,000</h3>
                <p className="text-slate-300 mt-1">AI-thon Champions</p>
            </div>
            <div className="glass-card rounded-2xl p-8">
                <p className="text-orange-400 font-bold text-lg">SPECIAL AWARD</p>
                <h3 className="text-4xl font-bold text-white mt-2">LKR 200,000</h3>
                <p className="text-slate-300 mt-1">Most Innovative Prototype</p>
            </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-700">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left py-4 flex justify-between items-center">
        <span className="text-lg font-medium text-white">{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current text-teal-400"><path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 pr-8 text-gray-400">
          {item.answer}
        </div>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto p-4 rounded-lg glass-card">
          {faqData.map((item, index) => (
            <FaqItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Registration = React.forwardRef(({ qrCodeUrl, formUrl }, ref) => {
    return (
        <section id="register" ref={ref} className="py-24">
            <div className="container mx-auto px-6">
                <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Your Mission Starts Now.</h2>
                            <p className="mt-4 text-lg text-slate-300">
                                Assemble your team of up to 5 innovators. Scan the QR code or click the button to access the official registration portal. Spots are limited.
                            </p>
                            <a
                                href={formUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center justify-center w-full md:w-auto py-4 px-8 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
                            >
                                Open Registration Form
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
        <footer className="bg-black/30 border-t border-slate-800">
            <div className="container mx-auto px-6 py-8 text-center text-slate-500">
                <p>&copy; {new Date().getFullYear()} Hemas Holdings PLC. An Initiative by the Transformation Team.</p>
                <p className="text-sm mt-2">Forge the future. Build with purpose.</p>
            </div>
        </footer>
    );
}
