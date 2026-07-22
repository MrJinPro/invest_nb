import React, { useState } from 'react';
import { ShieldCheck, Lock, Sparkles, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const Footer: React.FC = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#05080e] border-t border-white/10 py-12 relative overflow-hidden text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Logo & Tagline */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-xl text-white font-['Outfit']">
                Nova<span className="text-cyan-400">Boost</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Seed Round 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'ru' 
                ? 'Стриминговая Экосистема Нового Поколения. Все метрики строго соответствуют меморандуму.' 
                : 'Next Generation Streaming Ecosystem. All metrics strictly based on Memorandum facts.'}
            </p>
          </div>

          {/* Quick Legal Links */}
          <div className="flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {language === 'ru' ? 'Политика Конфиденциальности' : 'Privacy Policy'}
            </button>

            <span className="text-slate-700">•</span>

            <span className="text-slate-400 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ru' ? 'Конфиденциально' : 'Confidential'}</span>
            </span>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NovaBoost. All rights reserved. Confidential Investor Memorandum.
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Investor Portal • Seed 2026</span>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-white/15 space-y-6 relative max-h-[85vh] overflow-y-auto text-slate-300"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-bold text-lg font-['Outfit']">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>{language === 'ru' ? 'Политика Конфиденциальности' : 'Privacy Policy'}</span>
                </div>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs leading-relaxed">
                {language === 'ru' ? (
                  <>
                    <p>
                      1. Все данные, переданные через формы обратной связи данного сайта, используются исключительно для целей коммуникации по раунду NovaBoost Seed Round 2026.
                    </p>
                    <p>
                      2. Проект NovaBoost обязуется не передавать третьим лицам контактную информацию инвесторов без их явного письменного согласия.
                    </p>
                    <p>
                      3. Инвестиционные материалы и меморандум предназначены строго для персонального ознакомления квалифицированными и частными инвесторами.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      1. All information submitted through contact forms on this platform is processed solely for communication regarding NovaBoost Seed Round 2026.
                    </p>
                    <p>
                      2. NovaBoost guarantees confidential handling and will not share investor contact details with third parties without express consent.
                    </p>
                    <p>
                      3. Investment materials and memorandum documents are intended strictly for individual review by prospective investors.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs cursor-pointer"
                >
                  {language === 'ru' ? 'Понятно' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
