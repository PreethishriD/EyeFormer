import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Box, Share2, Info } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-orbitron font-bold text-[10px] tracking-widest uppercase mb-4"
          >
            System Workflow
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Proposed <span className="text-primary">Architecture</span></h2>
          <p className="text-slate-600 leading-relaxed">
            The framework utilizes a hierarchical transformer encoder (SegFormer) coupled with a 
            lightweight All-MLP decoder. This design effectively merges local features with global 
            contextual information for precise ocular classification.
          </p>
        </div>
        <div className="hidden lg:flex gap-4">
          <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Multiscale</span>
          </div>
          <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Transformer</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Actual Image Section */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <img 
              src="/assets/architecture.jpeg" 
              alt="System Architecture" 
              className="w-full h-auto rounded-lg shadow-inner border border-slate-100"
            />
            <div className="mt-6 flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                Figure: The detailed pipeline of the proposed transformer-based framework, illustrating the 
                patch embedding, hierarchical encoders, and the final classification head.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-5 space-y-8">
          {[
            {
              title: "Hierarchical Encoder",
              desc: "Extracts multi-scale features from ocular images, capturing both fine pathological textures and broad anatomical structures.",
              icon: <Layers className="w-5 h-5 text-primary" />
            },
            {
              title: "Self-Attention Mechanism",
              desc: "Models long-range dependencies across image patches, allowing the framework to focus on specific symptomatic regions.",
              icon: <Share2 className="w-5 h-5 text-secondary" />
            },
            {
              title: "MLP Decoder Head",
              desc: "A lightweight decoder that aggregates features from different layers to produce the final classification probability.",
              icon: <Box className="w-5 h-5 text-accent" />
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm shadow-slate-100">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 font-orbitron uppercase tracking-wider">{item.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-8 border-t border-slate-100">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Core Advantage</h4>
            <div className="p-4 bg-sky-50 rounded-lg border border-sky-100">
              <p className="text-[11px] font-bold text-primary leading-relaxed">
                "Unlike traditional CNNs, the Transformer architecture excels in understanding the global spatial relationship 
                between ocular pathologies, leading to higher diagnostic precision."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
