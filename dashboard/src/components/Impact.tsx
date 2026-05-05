import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Lightbulb, Users, Handshake } from 'lucide-react';

const Impact: React.FC = () => {
  const sdgs = [
    {
      id: 3,
      title: "Good Health & Well-being",
      desc: "Early detection of ocular diseases to prevent permanent vision loss and assist clinicians with AI support.",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      color: "border-rose-100 bg-rose-50/30"
    },
    {
      id: 9,
      title: "Industry & Innovation",
      desc: "Advancing medical imaging technologies and scalable digital healthcare infrastructure through transformer models.",
      icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
      color: "border-amber-100 bg-amber-50/30"
    },
    {
      id: 10,
      title: "Reduced Inequalities",
      desc: "Providing affordable, accessible diagnostic tools for low-resource settings and bridging the rural-urban healthcare gap.",
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      color: "border-indigo-100 bg-indigo-50/30"
    },
    {
      id: 17,
      title: "Partnerships for Goals",
      desc: "Utilizing open datasets and fostering collaboration between healthcare professionals and AI researchers globally.",
      icon: <Handshake className="w-6 h-6 text-emerald-500" />,
      color: "border-emerald-100 bg-emerald-50/30"
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-emerald-600 font-orbitron font-bold text-[10px] tracking-widest uppercase mb-4"
        >
          Social Responsibility
        </motion.div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Sustainable <span className="text-emerald-600">Impact</span></h2>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          This project is strategically aligned with the United Nations Sustainable Development 
          Goals, aiming to democratize high-end medical diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sdgs.map((sdg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-8 rounded-2xl border ${sdg.color} relative group overflow-hidden`}
          >
            <div className="absolute top-4 right-4 text-[40px] font-black opacity-5 group-hover:opacity-10 transition-opacity font-orbitron">
              {sdg.id}
            </div>
            <div className="mb-6 p-3 bg-white rounded-xl shadow-sm w-fit group-hover:scale-110 transition-transform">
              {sdg.icon}
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider font-orbitron">SDG {sdg.id}: {sdg.title}</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed opacity-80">{sdg.desc}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Impact;
