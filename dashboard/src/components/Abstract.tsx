import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Abstract: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-orbitron font-bold text-[10px] tracking-widest uppercase mb-4"
          >
            Project Summary
          </motion.div>
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Abstract</h2>
          <div className="glass-panel p-8 border-slate-100 shadow-sm rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
              This study proposes a transformer-based deep learning framework for the automated classification of anterior segment ocular diseases, specifically pterygium and conjunctivitis, using heterogeneous clinical image datasets. Four advanced vision transformer architectures such as SegFormer, Vision Transformer (ViT), MaxViT, and MobileViT are systematically evaluated using transfer learning to enhance feature generalization. Unlike conventional convolutional models, transformer-based approaches effectively capture long-range spatial dependencies and contextual relationships within ocular images. Among the evaluated models, SegFormer achieves the highest classification accuracy of 96%, outperforming ViT (95%), MaxViT (92%), and MobileViT (94%). Cross-dataset validation further demonstrates strong generalization, with SegFormer attaining 90% accuracy for pterygium and 95% for conjunctivitis. The study highlights the effectiveness of lightweight and scalable transformer architectures for reliable and clinically applicable ocular disease diagnosis, contributing to the development of AI-driven clinical decision support systems.
            </p>
          </div>
        </div>
        <div className="hidden lg:flex p-8 glass-panel border-slate-100 rounded-2xl items-center justify-center shrink-0 w-64 h-64 mt-14">
          <BookOpen className="w-24 h-24 text-primary/20" />
        </div>
      </div>
    </div>
  );
};

export default Abstract;
