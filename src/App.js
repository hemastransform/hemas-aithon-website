import React, { useState, useRef } from 'react';

// --- Helper Data & Components ---

// Icon components for better visuals.
const IconLightbulb = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 9 6c0 1.3.5 2.6 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>;
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;


const faqData = [
  {
    question: "What is the 'Discovery & Build' framework?",
    answer: "Instead of giving you a pre-defined problem, we immerse you in our business challenges. You get the 'structured freedom' to discover an opportunity and design your own AI agent-based solution, making your project highly relevant and innovative.",
  },
  {
    question: "What is the team size?",
    answer: "Teams can have up to 5 members. You must register as a team. The registration form will require the name and NIC for each member.",
  },
  {
    question: "What is the 'Agent Blueprint' challenge?",
    answer: "After the Immersion Day, you will have one week to submit a structured, one-page proposal for the AI agent you plan to build. The top 6 blueprints will be selected to compete in the final 24-hour hackathon.",
  },
  {
    question: "What is the primary tech stack?",
    answer: "Our primary cloud environment is Microsoft Azure. We encourage solutions using Python. Experience with AI frameworks like LangChain and AutoGen is a plus. You'll receive a full tech brief in the 'Digital Briefing Pack'.",
  },
];

const scheduleData = [
    { phase: "Phase 1", date: "Jul 28 - Aug 22", title: "University Outreach & Applications", description: "The official application process is launched. Aspiring participants can apply to be part of the initial cohort." },
    { phase: "Phase 2", date: "Aug 18 - Sep 5", title: "Participant Selection", description: "Applications are reviewed, and the top 50 students are selected and invited to the Hemas Immersion Day." },
    { phase: "Phase 3", date: "Sep 8 - Sep 19", title: "Immersion & Ideation", description: "Selected participants join the online Immersion Day and then compete in the one-week 'Agent Blueprint' challenge." },
    { phase: "Phase 4", date: "Sep 22 - Oct 1", title: "The AI-thon Finale", description: "The top 6 teams are selected to build their prototypes in a final, 24-hour hackathon event, followed by judging and awards." },
];

// --- Main Components ---

function Header({ scrollTo }) {
  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Hemas <span className="text-teal-400">AI-thon</span></div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="text-gray-300 hover:text-teal-400 transition-colors">About</a>
          <a href="#prizes" onClick={(e) => scrollTo(e, 'prizes')} className="text-gray-300 hover:text-teal-400 transition-colors">Prizes</a>
          <a href="#schedule" onClick={(e) => scrollTo(e, 'schedule')} className="text-gray-300 hover:text-teal-400 transition-colors">Timeline</a>
          <a href="#faq" onClick={(e) => scrollTo(e, 'faq')} className="text-gray-300 hover:text-teal-400 transition-colors">FAQ</a>
        </div>
        <a href="#register" onClick={(e) => scrollTo(e, 'register')} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105 shadow-md">
          Register Your Team
        </a>
      </nav>
    </header>
  );
}

function Hero({ scrollTo }) {
  return (
    <section className="bg-gray-900 text-white py-20 md:py-32" style={{backgroundColor: '#0a101f'}}>
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">Hemas <span className="text-teal-400" style={{textShadow: '0 0 8px rgba(20, 209, 190, 0.7)'}}>AI-thon</span></h1>
        <p className="mt-4 text-2xl text-orange-400 font-semibold" style={{textShadow: '0 0 8px rgba(255, 118, 1, 0.7)'}}>A Strategic Framework for Innovation & Talent Discovery</p>
        <div className="mt-10 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm md:text-base">
            <div className="font-semibold text-slate-300 p-3 rounded-lg bg-gray-800/50 w-48 text-center">Immersion Day</div>
            <div className="text-teal-400 text-2xl font-light">&rarr;</div>
            <div className="font-semibold text-slate-300 p-3 rounded-lg bg-gray-800/50 w-48 text-center">Blueprint Proposal</div>
            <div className="text-teal-400 text-2xl font-light">&rarr;</div>
            <div className="font-semibold text-white bg-teal-500 p-3 rounded-lg w-48 text-center">Hackathon Finale</div>
        </div>
        <button onClick={(e) => scrollTo(e, 'register')} className="mt-12 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl">
          Register Your Team
        </button>
      </div>
    </section>
  );
}

function About() {
    return (
        <section id="about" className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl" style={{background: 'rgba(20, 28, 48, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                    <h2 className="text-3xl font-bold text-white mb-4">From Ideas to Implementation</h2>
                    <p className="text-slate-300 text-lg">
                        We are strategically pivoting from a traditional hackathon to an innovative **"Discovery & Build"** framework. We will first immerse the brightest university talent in the world of Hemas—our businesses and strategic ambitions. Then, we will challenge you to identify unique opportunities and design your own AI agent-based solutions, ensuring projects are not only technically brilliant but also rooted in genuine business insight.
                    </p>
                </div>
            </div>
        </section>
    );
}

function Themes() {
  const themes = [
    { title: "Structured Freedom", description: "Our core philosophy is to provide a 'scaffolding' that guides your creativity towards areas of high business value, while giving you complete freedom to build what you envision within that structure." },
    { title: "Vision-First, Not Pain-Point First", description: "You won't be solving small, isolated problems. You'll be tackling strategic challenges derived from the future ambitions of our business units, making your work truly impactful." },
    { title: "Build AI Agents", description: "This is your chance to work with cutting-edge AI. We're looking for innovative AI agents that can automate, analyze, and transform how our businesses operate." },
  ];

  return (
    <section id="themes" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Unique Approach</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <div key={index} className="p-8 rounded-lg transform hover:-translate-y-2 transition-transform duration-300" style={{background: 'rgba(20, 28, 48, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-500/20 text-teal-400 mb-6">
                <IconLightbulb />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{theme.title}</h3>
              <p className="text-gray-400">{theme.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Prizes() {
  return (
    <section id="prizes" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Prizes & Recognition</h2>
        <p className="text-center text-slate-400 mb-8 max-w-3xl mx-auto">We are rewarding both brilliant ideas and excellent execution with a significant prize pool.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl" style={{background: 'rgba(20, 28, 48, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                <p className="text-orange-400 font-bold">RUNNER-UP</p>
                <h3 className="text-3xl font-bold text-white mt-2">LKR 100,000</h3>
                <p className="text-slate-300 mt-1">AI-thon Runner-Up (2nd Place)</p>
            </div>
            <div className="p-6 rounded-2xl border-2 border-teal-400 shadow-lg shadow-teal-500/20" style={{background: 'rgba(20, 28, 48, 0.6)'}}>
                <p className="text-teal-400 font-bold">GRAND PRIZE</p>
                <h3 className="text-4xl font-extrabold text-white mt-2">LKR 200,000</h3>
                <p className="text-slate-300 mt-1">AI-thon Champion (1st Place)</p>
            </div>
            <div className="p-6 rounded-2xl" style={{background: 'rgba(20, 28, 48, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                <p className="text-orange-400 font-bold">SPECIAL AWARD</p>
                <h3 className="text-3xl font-bold text-white mt-2">LKR 200,000</h3>
                <p className="text-slate-300 mt-1">Best Innovative Idea & App</p>
            </div>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
    return (
        <section id="schedule" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Competition Timeline</h2>
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-gray-700"></div>
                    {scheduleData.map((item, index) => (
                        <div key={index} className="relative mb-8 flex items-center w-full">
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

function FaqItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-700">
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
    <section id="faq" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto p-4 rounded-lg" style={{background: 'rgba(20, 28, 48, 0.6)'}}>
          {faqData.map((item, index) => (
            <FaqItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Registration() {
    // ** Link updated with the one you provided **
    const registrationFormUrl = "https://forms.office.com/Pages/ResponsePage.aspx?id=AtcqC_7EGUOpT0wB8yHV58IWbFpHfXxCuH2dMg4-Jl1UNEtIMUgwMTVUQkEwTExINjBJUkhIS1BGUC4u";

    return (
        <section id="register" className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Register Your Team</h2>
                        <p className="mt-4 text-lg text-gray-400">
                            Ready to build the future of AI at Hemas? Team registration is now open.
                            Click the button below to register your team of up to 5 members.
                        </p>
                    </div>
                    <div className="p-8 rounded-lg shadow-2xl" style={{background: 'rgba(20, 28, 48, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                        <a
                            href={registrationFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full md:w-auto py-4 px-8 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
                        >
                            Open Registration Form
                            <span className="ml-3">
                                <IconExternalLink />
                            </span>
                        </a>
                        <p className="text-sm text-gray-500 mt-4">You will be redirected to an external site to complete your registration.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-6 py-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Hemas Holdings PLC. An Initiative by the Transformation Team.</p>
            </div>
        </footer>
    );
}

// --- Main App Component ---
export default function App() {
  const refs = {
    about: useRef(null),
    prizes: useRef(null),
    schedule: useRef(null),
    faq: useRef(null),
    register: useRef(null),
  };

  const scrollTo = (event, id) => {
    event.preventDefault();
    refs[id].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{backgroundColor: '#0a101f', fontFamily: "'Poppins', sans-serif"}} className="text-slate-300">
      <Header scrollTo={scrollTo} />
      <main>
        <Hero scrollTo={scrollTo} />
        <div ref={refs.about}><About /></div>
        <Themes />
        <div ref={refs.prizes}><Prizes /></div>
        <div ref={refs.schedule}><Schedule /></div>
        <div ref={refs.faq}><FAQ /></div>
        <div ref={refs.register}><Registration /></div>
      </main>
      <Footer />
    </div>
  );
}
