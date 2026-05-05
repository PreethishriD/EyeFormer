import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Presentation, Download, ExternalLink, GitBranch } from 'lucide-react';

const Downloads: React.FC = () => {
  const files = [
    {
      title: "Project Report",
      desc: "Full comprehensive Phase-II research document including technical methodology and results.",
      type: "PDF Document",
      size: "4.5 MB",
      icon: <FileText className="w-8 h-8 text-secondary" />,
      link: "/final_report.pdf"
    },
    {
      title: "Project PPT",
      desc: "Detailed visual summary and review presentation of the transformer-based framework.",
      type: "PDF Presentation",
      size: "522 KB",
      icon: <Presentation className="w-8 h-8 text-primary" />,
      link: "/ppt_analysis.pdf"
    }
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-orbitron font-bold text-[10px] tracking-widest uppercase mb-4"
          >
            Research Materials
          </motion.div>
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Public <span className="text-primary">Resources</span></h2>
          <p className="text-slate-600 mb-10 max-w-lg leading-relaxed">
            Access the complete research artifacts associated with this project. These files contain 
            in-depth technical details, code architectures, and comprehensive data analysis.
          </p>
          
          <div className="flex flex-col gap-6">
            {files.map((file, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-panel p-6 border-slate-100 hover:border-primary/20 transition-all flex items-center gap-8 shadow-md shadow-slate-200/50"
              >
                <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-white transition-colors border border-slate-100">
                  {file.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold mb-1 font-orbitron text-slate-900 uppercase tracking-wider">{file.title}</h3>
                  <p className="text-[11px] text-slate-600 mb-3">{file.desc}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{file.type}</span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">•</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{file.size}</span>
                  </div>
                </div>
                <a 
                  href={file.link} 
                  download
                  className="p-4 rounded-full bg-primary text-white hover:bg-sky-600 transition-all shadow-lg shadow-sky-100"
                >
                  <Download className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="glass-panel p-10 border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
            <h3 className="text-xs font-bold mb-8 font-orbitron flex items-center gap-3 text-slate-900 uppercase tracking-widest">
              <GitBranch className="w-4 h-4 text-primary" />
              Developer Hub
            </h3>
            
            <div className="space-y-6">
              {[
                { label: "Phase-I Project", title: "Previous Eye Classification", url: "https://github.com/PreethishriD/EYE_PROJECT.git" },
                { label: "Phase-II Project", title: "Transformer Models Repo", url: "https://github.com/PreethishriD/EYE-PROJECT-MODELS-" }
              ].map((repo, i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/20 transition-all group">
                  <p className="text-[9px] font-bold text-primary font-orbitron mb-1 uppercase tracking-widest">{repo.label}</p>
                  <p className="text-xs font-bold text-slate-900 mb-4">{repo.title}</p>
                  <a href={repo.url} target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:text-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-widest">
                    Open Repository <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center font-orbitron font-bold text-sm text-primary border border-sky-100">
                  PD
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 font-orbitron uppercase tracking-wider">PREETHISHRI D</p>
                  <p className="text-[10px] text-slate-400 font-medium">CSE Research Scholar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
