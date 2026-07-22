import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  Building2, 
  Monitor, 
  Smartphone, 
  Network, 
  GraduationCap, 
  Radio, 
  Repeat, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_MODEL, RevenueStream } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

const getStreamIcon = (id: string) => {
  switch (id) {
    case 'bm1': return <Building2 className="w-5 h-5 text-cyan-400" />;
    case 'bm2': return <Monitor className="w-5 h-5 text-indigo-400" />;
    case 'bm3': return <Smartphone className="w-5 h-5 text-sky-400" />;
    case 'bm4': return <Network className="w-5 h-5 text-purple-400" />;
    case 'bm5': return <GraduationCap className="w-5 h-5 text-emerald-400" />;
    case 'bm6': return <Radio className="w-5 h-5 text-rose-400" />;
    default: return <DollarSign className="w-5 h-5 text-cyan-400" />;
  }
};

export const BusinessModelSection: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section id="business-model" className="py-24 relative overflow-hidden bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{t.business.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.business.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.business.subtitle}
          </p>
        </div>

        {/* Revenue Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_MODEL.map((stream, idx) => {
            const isRecurring = stream.category === 'Recurring Revenue';

            return (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      {getStreamIcon(stream.id)}
                    </div>

                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 border ${
                      isRecurring
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                    }`}>
                      {isRecurring ? <Repeat className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                      <span>{stream.category}</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white font-['Outfit']">
                      {stream.title}
                    </h3>
                    <div className="text-xs font-medium text-cyan-400">
                      {stream.type}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {stream.description}
                  </p>
                </div>

                {/* Monetization Mechanism */}
                <div className="pt-3 border-t border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {language === 'ru' ? 'Механика монетизации' : 'Monetization Mechanics'}
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    {stream.monetization}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Footnote banner */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            {language === 'ru' 
              ? 'Диверсификация каналов снижает зависимость проекта от единственного источника выручки.' 
              : 'Channel diversification protects the platform from reliance on any single revenue source.'}
          </span>
        </div>

      </div>
    </section>
  );
};
