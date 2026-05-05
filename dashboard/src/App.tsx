import React from 'react';
import { Eye, Heart } from 'lucide-react';
import Hero from './components/Hero';
import Architecture from './components/Architecture';
import Results from './components/Results';
import Demo from './components/Demo';
import Downloads from './components/Downloads';
import Impact from './components/Impact';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-600">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100/50 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 blur-[120px] rounded-full"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-8 py-3.5 border-slate-200 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Eye className="text-white w-4 h-4" />
            </div>
            <span className="font-orbitron font-bold text-sm tracking-tight text-slate-900">EYE<span className="text-primary">FORMER</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-orbitron text-[10px] tracking-widest text-slate-500 uppercase">
            {['Home', 'Architecture', 'Results', 'Impact', 'Demo', 'Downloads'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-20">
          <Hero />
        </section>

        <section id="architecture" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100">
          <Architecture />
        </section>

        <section id="results" className="py-24 px-6 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <Results />
          </div>
        </section>

        <section id="impact" className="py-24 px-6 max-w-7xl mx-auto">
          <Impact />
        </section>

        <section id="demo" className="py-24 px-6 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <Demo />
          </div>
        </section>

        <section id="downloads" className="py-24 px-6 max-w-7xl mx-auto">
          <Downloads />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Eye className="text-white w-4 h-4" />
              </div>
              <span className="font-orbitron font-bold text-sm tracking-tighter text-slate-900">OCULAR<span className="text-primary">AI</span></span>
            </div>
            <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
              Advanced Transformer-Based Framework for Automated Classification of Ocular Surface Diseases.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-slate-400 text-[10px] font-orbitron uppercase tracking-widest mb-1">Lead Researcher</div>
            <div className="text-slate-900 font-bold font-orbitron text-sm">PREETHISHRI D (24CSF05)</div>
            <div className="text-slate-400 text-xs">Nandha Engineering College, Tamil Nadu</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest font-orbitron">
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 text-rose-500" />
            <span>AI for Clinical Excellence</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
