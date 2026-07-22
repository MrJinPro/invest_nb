import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ROADMAP_PHASES, RoadmapPhase } from '../data/novaboost-data';

export const RoadmapSection: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<string>('Этап I');

  const togglePhase = (phase: string) => {
    setExpandedPhase(expandedPhase === phase ? '' : phase);
  };

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[#080b11]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <Compass className="w-3.5 h-3.5" />
            <span>План Развития</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Дорожная Карта <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Roadmap 2026–2027</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Последовательный вектор развития экосистемы от публичного запуска базовых модулей до международной экспансии.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-indigo-500 before:to-slate-800">
          
          {ROADMAP_PHASES.map((item, index) => {
            const isExpanded = expandedPhase === item.phase;
            const isInProgress = item.status === 'in_progress';

            return (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Marker Dot */}
                <div 
                  className={`absolute -left-[31px] sm:-left-[47px] top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isInProgress
                      ? 'bg-cyan-500 border-cyan-300 shadow-lg shadow-cyan-500/50'
                      : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  {isInProgress ? (
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  )}
                </div>

                {/* Phase Card */}
                <div 
                  className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'border-cyan-500/40 shadow-xl shadow-cyan-950/20 bg-[#0c1322]' 
                      : 'border-white/10 hover:border-white/20 bg-[#090e18]/80'
                  }`}
                >
                  {/* Header row */}
                  <div 
                    onClick={() => togglePhase(item.phase)}
                    className="p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/20">
                          {item.phase}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {item.period}
                        </span>
                        {isInProgress && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                            Текущий этап
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white font-['Outfit']">
                        {item.title}
                      </h3>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 shrink-0">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
                    </div>
                  </div>

                  {/* Collapsible Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4"
                      >
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="space-y-2">
                          <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                            Ключевые майлстоуны этапа:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {item.milestones.map((m, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200 flex items-start gap-2.5">
                                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{m}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
