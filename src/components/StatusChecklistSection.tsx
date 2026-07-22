import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Server, Shield, Sparkles } from 'lucide-react';
import { SYSTEM_STATUS_CHECKLIST } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const StatusChecklistSection: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0e17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.status.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.status.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.status.subtitle}
          </p>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYSTEM_STATUS_CHECKLIST.map((item, index) => {
            const isReady = item.status === 'Ready' || item.status === 'Deployed' || item.status === 'Configured';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-4 hover:border-cyan-500/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isReady 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {isReady ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white font-['Outfit']">
                        {item.module}
                      </h3>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-400 bg-white/5">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {item.details}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold ${
                    isReady 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.status}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Total Readiness Summary */}
        <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan-400 shrink-0" />
            <span className="text-slate-300">
              {language === 'ru' 
                ? 'Базовая инфраструктура развернута. Проект готов к финализации публичного релиза в рамках средств Seed-раунда.'
                : 'Core infrastructure deployed. Platform ready for public release rollout.'}
            </span>
          </div>
          <span className="font-mono text-cyan-300 font-bold shrink-0 hidden sm:inline-block">
            100% In-House IP
          </span>
        </div>

      </div>
    </section>
  );
};
