import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Award, Table } from 'lucide-react';

const Results: React.FC = () => {
  const modelComparison = [
    { model: "SegFormer", accuracy: 96.0, recall: 95.2 },
    { model: "ViT", accuracy: 95.0, recall: 86.4 },
    { model: "MobileViT", accuracy: 94.0, recall: 93.1 },
    { model: "MaxViT", accuracy: 92.0, recall: 95.5 },
  ];

  return (
    <div className="w-full space-y-10">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-orbitron font-bold text-xs tracking-widest uppercase mb-2"
          >
            Experimental Data
          </motion.p>
          <h2 className="text-2xl font-bold mb-2 text-slate-900">Research <span className="text-secondary">Benchmarks</span></h2>
          <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
            Quantitative analysis across transformer backbones. SegFormer demonstrates superior performance across all metrics.
          </p>
        </div>
        <div className="flex gap-8 shrink-0">
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-orbitron">Best Accuracy</p>
            <p className="text-3xl font-black text-primary font-orbitron">96.0%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-orbitron">Val. Loss</p>
            <p className="text-3xl font-black text-secondary font-orbitron">0.08</p>
          </div>
        </div>
      </div>

      {/* Graphs — Side by Side, Reduced Size */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Training Curves */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel border-slate-100 shadow-md overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary shrink-0" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-orbitron">Training Curves</h3>
          </div>
          <div className="p-5">
            <img src="/assets/training_curves.png" alt="Training Curves" className="w-full object-contain rounded-lg border border-slate-100" style={{maxHeight: '220px'}} />
            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              Convergence of training and validation accuracy demonstrates robust generalisation.
            </p>
          </div>
        </motion.div>

        {/* Model Inference Samples */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-panel border-slate-100 shadow-md overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary shrink-0" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-orbitron">Inference Samples</h3>
          </div>
          <div className="p-5">
            <img src="/assets/sample_img.jpeg" alt="Sample Images" className="w-full object-contain rounded-lg border border-slate-100" style={{maxHeight: '220px'}} />
            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              Output visualization of classification successfully detecting conditions with high confidence.
            </p>
          </div>
        </motion.div>

        {/* Confusion Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-panel border-slate-100 shadow-md overflow-hidden"
        >
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary shrink-0" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-orbitron">Confusion Matrix</h3>
          </div>
          <div className="p-5">
            <img src="/assets/confusion_matrix.jpeg" alt="Confusion Matrix" className="w-full object-contain rounded-lg border border-slate-100" style={{maxHeight: '220px'}} />
            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              High diagonal values confirm precision in distinguishing Pterygium from Conjunctivitis with minimal false positives.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Table + Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Table */}
        <div className="lg:col-span-8 glass-panel overflow-hidden border-slate-100 shadow-md">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2">
            <Table className="w-4 h-4 text-primary shrink-0" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-orbitron">Transformer Performance Index</h3>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {['Model', 'Architecture', 'Accuracy', 'Recall'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wide border-b border-slate-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {modelComparison.map((item, i) => (
                <tr key={i} className="hover:bg-sky-50/30 transition-colors group">
                  <td className="px-5 py-3">
                    <span className={`text-sm font-bold font-orbitron group-hover:text-primary transition-colors ${i === 0 ? 'text-primary' : 'text-slate-700'}`}>
                      {item.model}
                    </span>
                    {i === 0 && <span className="ml-2 text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Best</span>}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500">
                    {i === 0 ? 'Hierarchical' : i === 1 ? 'Pure Transformer' : i === 2 ? 'Lightweight Hybrid' : 'Hybrid (Conv+Trans)'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${i === 0 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {item.accuracy}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold text-slate-500">{item.recall}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-400 italic">Comparative Analysis of Transformer Models for Ocular Disease Classification.</p>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 border-slate-100 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-primary shrink-0" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-orbitron">Model Superiority</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              SegFormer's hierarchical encoder preserves high-resolution spatial features — critical for accurate boundary delineation in ocular pathology.
            </p>
            <div className="space-y-3">
              {[
                { label: "SegFormer", val: 96, active: true },
                { label: "ViT", val: 95, active: false },
              ].map(({ label, val, active }) => (
                <div key={label} className={`p-3 rounded-xl border ${active ? 'bg-sky-50 border-sky-100' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-xs font-bold uppercase tracking-widest font-orbitron ${active ? 'text-primary' : 'text-slate-400'}`}>{label}</span>
                    <span className={`text-xs font-black font-orbitron ${active ? 'text-primary' : 'text-slate-400'}`}>{val}%</span>
                  </div>
                  <div className="h-1.5 bg-white rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${active ? 'bg-primary' : 'bg-slate-300'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;
