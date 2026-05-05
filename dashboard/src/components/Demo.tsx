import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Activity, AlertCircle, CheckCircle, RefreshCw, ImageIcon, X } from 'lucide-react';

interface PredictionResult {
  prediction: string;
  confidence: number;
  probabilities: { [key: string]: number };
}

const API_URL = "https://eyeformer.onrender.com";

const Demo: React.FC = () => {
  const [stage, setStage] = useState<'idle' | 'preview' | 'scanning' | 'result' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (JPG, PNG, etc.)');
      setStage('error');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStage('preview');
    setResult(null);
    setErrorMsg('');
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setStage('scanning');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Server error');
      }

      const data: PredictionResult = await response.json();
      setResult(data);
      setStage('result');
    } catch (err: any) {
      setErrorMsg(err.message?.includes('fetch') 
        ? 'Could not connect to the model server. Please ensure server.py is running on port 5050.'
        : err.message || 'An error occurred during analysis.');
      setStage('error');
    }
  };

  const reset = () => {
    setStage('idle');
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setErrorMsg('');
  };

  const getConditionDetails = (prediction: string) => {
    if (prediction === 'Pterygium') return {
      features: ["Fibrovascular tissue growth", "Corneal encroachment", "UV-related pathology"],
      color: "bg-amber-50 border-amber-100",
      badge: "text-amber-700 bg-amber-100",
    };
    return {
      features: ["Conjunctival inflammation", "Vascular congestion", "Possible infection"],
      color: "bg-rose-50 border-rose-100",
      badge: "text-rose-700 bg-rose-100",
    };
  };

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-primary font-orbitron font-bold text-[10px] tracking-widest uppercase mb-4"
        >
          Live Diagnostic Engine
        </motion.div>
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Real-Time <span className="text-primary">Model Inference</span></h2>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload any ocular surface image and the SegFormer model will classify it as 
          <strong> Pterygium</strong> or <strong>Conjunctivitis</strong> in real time.
        </p>
      </div>

      <div className="max-w-5xl mx-auto glass-panel border-slate-100 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-slate-200/50 min-h-[580px]">

        {/* Left Panel — Upload */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-100 p-8 bg-slate-50/50 flex flex-col gap-6">
          <h3 className="text-[10px] font-orbitron font-bold uppercase tracking-[0.2em] text-slate-400">Image Upload</h3>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => document.getElementById('file-input')?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging ? 'border-primary bg-sky-50' : 'border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50'
            }`}
          >
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
            />
            <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Drop image here</p>
            <p className="text-[9px] text-slate-400 mt-1">or click to browse</p>
            <p className="text-[9px] text-slate-300 mt-2">JPG, PNG, WEBP supported</p>
          </div>

          {/* Thumbnail Preview */}
          {previewUrl && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img src={previewUrl} alt="Preview" className="w-full h-36 object-cover" />
              <button
                onClick={reset}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow border border-slate-100 hover:bg-rose-50 transition-colors"
              >
                <X className="w-3 h-3 text-slate-500" />
              </button>
              <div className="p-2 bg-white">
                <p className="text-[9px] text-slate-400 truncate font-medium">{selectedFile?.name}</p>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          {stage === 'preview' && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleAnalyze}
              className="w-full py-3 bg-primary text-white font-orbitron font-bold text-[10px] tracking-widest uppercase rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-100 flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Run Analysis
            </motion.button>
          )}

          {(stage === 'result' || stage === 'error') && (
            <button
              onClick={reset}
              className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-orbitron font-bold text-[10px] tracking-widest uppercase rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3 h-3" />
              New Analysis
            </button>
          )}


        </div>

        {/* Right Panel — Results */}
        <div className="flex-1 bg-white p-12 flex flex-col items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">

            {/* Idle */}
            {stage === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
                  <ImageIcon className="w-10 h-10 text-slate-200" />
                </div>
                <h4 className="font-orbitron text-lg font-bold text-slate-900 mb-3 uppercase tracking-widest">Awaiting Image</h4>
                <p className="text-slate-400 text-xs max-w-xs leading-relaxed">Upload an ocular surface image on the left panel to begin real-time SegFormer inference.</p>
              </motion.div>
            )}

            {/* Preview Ready */}
            {stage === 'preview' && (
              <motion.div key="preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                <div className="w-56 h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-100 mb-8">
                  <img src={previewUrl!} alt="Selected" className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-orbitron font-bold text-slate-500 uppercase tracking-widest mb-2">Image Ready</p>
                <p className="text-xs text-slate-400">Click <strong>"Run Analysis"</strong> to start inference</p>
              </motion.div>
            )}

            {/* Scanning */}
            {stage === 'scanning' && (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full">
                <div className="relative w-56 h-56 rounded-2xl overflow-hidden border border-primary/20 mb-10 shadow-xl shadow-sky-100">
                  <img src={previewUrl!} alt="Scanning" className="w-full h-full object-cover opacity-80" />
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[2px] bg-primary shadow-[0_0_20px_rgba(14,165,233,0.8)] z-20"
                  />
                  <div className="absolute inset-0 bg-sky-500/5 grid grid-cols-4 grid-rows-4">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div key={i} animate={{ opacity: [0.05, 0.3, 0.05] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }} className="border border-primary/10" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-xs font-orbitron font-bold text-primary uppercase tracking-[0.2em]">Running SegFormer Inference...</span>
                </div>
                <div className="w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-primary" />
                </div>
              </motion.div>
            )}

            {/* Result */}
            {stage === 'result' && result && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-slate-900 uppercase tracking-widest text-sm">Diagnostic Report</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">SegFormer Classification Result</p>
                  </div>
                  {previewUrl && (
                    <img src={previewUrl} alt="Result" className="ml-auto w-14 h-14 rounded-xl object-cover border border-slate-200" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Prediction */}
                  <div className={`p-6 rounded-2xl border ${getConditionDetails(result.prediction).color}`}>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-3">Classification</p>
                    <p className="text-xl font-black text-slate-900 font-orbitron uppercase">{result.prediction}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-white/60 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${result.confidence}%` }} className="h-full bg-primary" />
                      </div>
                      <span className="text-[10px] font-black text-primary font-orbitron">{result.confidence}%</span>
                    </div>
                    <p className="text-[9px] text-slate-400 mt-1 font-bold uppercase tracking-widest">Confidence</p>
                  </div>

                  {/* Probabilities */}
                  <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-4">Class Probabilities</p>
                    <div className="space-y-3">
                      {Object.entries(result.probabilities).map(([label, prob]) => (
                        <div key={label}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-slate-700">{label}</span>
                            <span className="text-[10px] font-black text-primary">{prob}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${prob}%` }} className={`h-full ${label === result.prediction ? 'bg-primary' : 'bg-slate-300'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-3">Associated Clinical Signs</p>
                  <ul className="flex flex-wrap gap-2">
                    {getConditionDetails(result.prediction).features.map((f, i) => (
                      <li key={i} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${getConditionDetails(result.prediction).badge}`}>{f}</li>
                    ))}
                  </ul>
                </div>


              </motion.div>
            )}

            {/* Error */}
            {stage === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-6 border border-rose-100">
                  <AlertCircle className="w-8 h-8 text-rose-500" />
                </div>
                <h4 className="font-orbitron font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Inference Error</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-6">{errorMsg}</p>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">To start the server:</p>
                  <code className="text-[10px] text-primary bg-sky-50 px-3 py-2 rounded block">python server.py</code>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Demo;
