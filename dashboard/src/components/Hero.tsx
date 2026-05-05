import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Scan, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl px-6 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-8"
        >
          <Activity className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-orbitron font-bold uppercase tracking-[0.2em] text-primary">Clinical AI Research • Phase II</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-slate-900"
        >
          Advanced <span className="text-primary">Transformer</span> <br />
          Ocular Diagnostic <br />
          Framework
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-lg mb-10 max-w-xl leading-relaxed"
        >
          Automated classification of Pterygium and Conjunctivitis using hierarchical 
          SegFormer architectures. State-of-the-art results with <span className="font-bold text-primary">96% diagnostic accuracy</span>.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center md:justify-start gap-4"
        >
          <a href="#architecture" className="px-8 py-4 bg-primary text-white font-orbitron font-bold rounded-lg hover:bg-sky-600 transition-all shadow-lg shadow-sky-100 flex items-center gap-2">
            METHODOLOGY <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#results" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-orbitron font-bold rounded-lg hover:bg-slate-50 transition-all shadow-sm">
            VIEW RESULTS
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 relative hidden lg:block"
      >
        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
          {/* Abstract Medical UI Elements */}
          <div className="absolute inset-0 rounded-full border border-slate-100 animate-spin-slow"></div>
          <div className="absolute inset-8 rounded-full border border-slate-100 border-dashed animate-spin-reverse-slow"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-64 h-64 rounded-full bg-sky-50 flex items-center justify-center border border-sky-100"
              >
                <Scan className="w-24 h-24 text-primary/40" />
              </motion.div>
              
              {/* Floating Data Nodes */}
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-6 -right-6 glass-panel p-4 shadow-xl shadow-sky-100/50">
                <Brain className="w-6 h-6 text-primary" />
              </motion.div>
              <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -bottom-6 -left-6 glass-panel p-4 shadow-xl shadow-sky-100/50">
                <ShieldCheck className="w-6 h-6 text-clinical" />
              </motion.div>
            </div>
          </div>
          
          {/* Animated Scan Line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-primary/40 shadow-[0_0_10px_rgba(14,165,233,0.3)] z-10"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
