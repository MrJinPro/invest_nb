import React from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  TrendingUp, 
  Server, 
  Globe, 
  Sparkles, 
  Code, 
  CheckCircle2,
  Zap
} from 'lucide-react';
import { WHY_NOVABOOST } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

const getAdvantageIcon = (iconName: string) => {
  switch (iconName) {
    case 'Layers': return <Layers className="w-6 h-6 text-cyan-400" />;
    case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-indigo-400" />;
    case 'Server': return <Server className="w-6 h-6 text-sky-400" />;
    case 'Globe': return <Globe className="w-6 h-6 text-emerald-400" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-400" />;
    case 'Code': return <Code className="w-6 h-6 text-amber-400" />;
    default: return <Zap className="w-6 h-6 text-cyan-400" />;
  }
};

export const WhyNovaBoostSection: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section className="py-24 relative overflow-hidden bg-[#080b11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.why.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.why.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.why.subtitle}
          </p>
        </div>

        {/* Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_NOVABOOST.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-panel glass-panel-hover rounded-2xl p-7 border border-white/10 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    {getAdvantageIcon(item.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-white/5 text-slate-300 border border-white/10">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'ru' ? 'Проверенное системное преимущество' : 'Verified Competitive Moat'}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
