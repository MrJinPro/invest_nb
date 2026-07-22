import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { MARKET_PROBLEMS } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const MarketProblemSection: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section id="market" className="py-24 relative overflow-hidden bg-[#0a0e17]">
      {/* Glow ambient background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.market.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.market.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.market.subtitle}
          </p>
        </div>

        {/* Two Column Market Problems & Solutions */}
        <div className="space-y-4">
          {MARKET_PROBLEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-white/20 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Left Column: Problem */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{language === 'ru' ? `Проблема #${index + 1}` : `Problem #${index + 1}`}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  {item.problemTitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.problemDesc}
                </p>
              </div>

              {/* Center Divider Arrow */}
              <div className="lg:col-span-2 flex items-center justify-center py-2 lg:py-0">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-md">
                  <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
                </div>
              </div>

              {/* Right Column: NovaBoost Solution */}
              <div className="lg:col-span-5 space-y-2 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                  <CheckCircle className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span>{language === 'ru' ? 'Решение NovaBoost' : 'NovaBoost Solution'}</span>
                </div>
                <h3 className="text-lg font-bold text-cyan-100 font-['Outfit']">
                  {item.solutionTitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.solutionDesc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Strategic Takeaway Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-indigo-950/60 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{language === 'ru' ? 'Стратегическое преимущество' : 'Strategic Advantage'}</h4>
              <p className="text-xs text-slate-300">
                {language === 'ru' 
                  ? 'Устранение барьеров на каждом этапе пути автора обеспечивает высокий показатель LTV и низкий отток клиентов (Churn Rate).'
                  : 'Eliminating friction at every step of creator journey ensures high LTV and low Churn Rate.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
