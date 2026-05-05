import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

const images = [
  { file: "maxvit.jpeg", label: "MaxViT", desc: "Multi-Axis Vision Transformer employing multi-axis attention to capture both local and global dependencies linearly." },
  { file: "mobilevit.jpeg", label: "MobileViT", desc: "A lightweight, general-purpose vision transformer designed for mobile devices, combining the benefits of CNNs and ViTs." },
  { file: "vit.jpeg", label: "Vision Transformer (ViT)", desc: "Applies a pure transformer directly to sequences of image patches for robust classification." }
];

const Gallery: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-primary font-orbitron font-bold text-[10px] tracking-widest uppercase mb-4"
        >
          Comparative Models
        </motion.div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Model <span className="text-primary">Architectures</span></h2>
        <p className="text-slate-600 leading-relaxed max-w-3xl">
          Detailed architectural diagrams of the evaluated vision transformer models. These models are compared against the proposed SegFormer baseline.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {images.map((img, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm shadow-slate-100 shrink-0">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-orbitron tracking-wide">{img.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{img.desc}</p>
              </div>
            </div>
            
            <div className="glass-panel p-8 border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <img 
                src={`/assets/${img.file}`} 
                alt={`${img.label} Architecture`}
                className="w-full h-auto rounded-lg shadow-inner border border-slate-100 bg-white"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
