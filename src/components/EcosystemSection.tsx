import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Monitor, 
  Smartphone, 
  Network, 
  GraduationCap, 
  Radio, 
  Wrench, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { ECOSYSTEM_PRODUCTS, ECOSYSTEM_FLOW, ProductItem } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

const getProductIcon = (type: string) => {
  switch (type) {
    case 'agency': return <Building2 className="w-6 h-6 text-cyan-400" />;
    case 'desktop': return <Monitor className="w-6 h-6 text-indigo-400" />;
    case 'mobile': return <Smartphone className="w-6 h-6 text-sky-400" />;
    case 'novalink': return <Network className="w-6 h-6 text-purple-400" />;
    case 'academy': return <GraduationCap className="w-6 h-6 text-emerald-400" />;
    case 'live': return <Radio className="w-6 h-6 text-rose-400" />;
    case 'tools': return <Wrench className="w-6 h-6 text-amber-400" />;
    default: return <Layers className="w-6 h-6 text-cyan-400" />;
  }
};

export const EcosystemSection: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(ECOSYSTEM_PRODUCTS[0]);
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-[#080b11]">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.ecosystem.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.ecosystem.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.ecosystem.subtitle}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden lg:block" preserveAspectRatio="none">
            <path d="M 150 100 Q 400 50 650 100 T 1150 100" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 200 350 Q 550 400 900 350" fill="none" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4 4" />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ECOSYSTEM_PRODUCTS.map((product) => {
              const isSelected = selectedProduct?.id === product.id;

              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedProduct(product)}
                  className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-[#0f172a]/90 border-2 border-cyan-400/80 shadow-xl shadow-cyan-500/20'
                      : 'glass-card hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        {getProductIcon(product.type)}
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {product.badge}
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center justify-between">
                        <span>{product.name}</span>
                        {isSelected && <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />}
                      </h3>
                      <p className="text-xs font-medium text-cyan-400/90">
                        {product.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="pt-3 border-t border-white/5 space-y-1.5">
                    {product.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Product Expanded Showcase */}
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900/90 via-[#0b1329] to-slate-900/90"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30">
                    {getProductIcon(selectedProduct.type)}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{selectedProduct.badge}</span>
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">{selectedProduct.name}</h3>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Feature Tags */}
              <div className="grid grid-cols-2 gap-2.5 w-full lg:w-auto shrink-0">
                {selectedProduct.features.map((feature, i) => (
                  <div key={i} className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Interactive Scheme */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                {language === 'ru' ? 'Синергетическая Модель' : 'Synergistic Model'}
              </span>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                {t.ecosystem.howItWorksTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              {t.ecosystem.howItWorksSubtitle}
            </p>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {ECOSYSTEM_FLOW.map((flow, index) => {
                const isActive = activeFlowStep === index;
                const isLast = index === ECOSYSTEM_FLOW.length - 1;

                return (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => setActiveFlowStep(index)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 h-full flex flex-col justify-between space-y-3 cursor-pointer ${
                        isActive
                          ? isLast 
                            ? 'bg-gradient-to-b from-emerald-950/80 to-slate-900 border-2 border-emerald-400/80 shadow-lg shadow-emerald-500/20'
                            : 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/20'
                          : 'bg-white/[0.02] hover:bg-white/[0.06] border border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                          {flow.step}
                        </span>
                        {isLast ? (
                          <Sparkles className="w-4 h-4 text-emerald-400 animate-bounce" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        )}
                      </div>

                      <div>
                        <div className={`text-xs font-bold font-['Outfit'] ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {flow.title}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Flow Step Description */}
            <div className="mt-6 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                  {ECOSYSTEM_FLOW[activeFlowStep].step}
                </span>
                <div>
                  <span className="font-bold text-white mr-2">{ECOSYSTEM_FLOW[activeFlowStep].title}:</span>
                  <span className="text-slate-300">{ECOSYSTEM_FLOW[activeFlowStep].desc}</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 shrink-0 hidden sm:inline-block">
                {language === 'ru' ? 'Кликните на этап для деталей' : 'Click step for details'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
