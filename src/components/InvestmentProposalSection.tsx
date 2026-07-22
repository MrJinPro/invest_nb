import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  DollarSign, 
  Percent, 
  Award, 
  ShieldCheck, 
  FileText, 
  Calendar,
  Zap
} from 'lucide-react';
import { SEED_ROUND_TERMS } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface InvestmentProposalSectionProps {
  onOpenMemorandum: () => void;
  onOpenSchedule: () => void;
}

export const InvestmentProposalSection: React.FC<InvestmentProposalSectionProps> = ({ 
  onOpenMemorandum, 
  onOpenSchedule 
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section id="investment" className="py-24 relative overflow-hidden bg-[#080b11]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.proposal.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.proposal.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.proposal.subtitle}
          </p>
        </div>

        {/* Premium Highlight Offer Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative gradient-border rounded-3xl glass-panel p-8 sm:p-12 border border-white/20 shadow-2xl bg-gradient-to-b from-[#0e172a] via-[#090e18] to-[#090e18]"
        >
          {/* Card Accent Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  {language === 'ru' ? 'Официальные Термины' : 'Official Terms'}
                </span>
                <h3 className="text-3xl font-extrabold text-white font-['Outfit']">
                  {SEED_ROUND_TERMS.roundName}
                </h3>
              </div>

              <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>{t.proposal.targetAmount} ${SEED_ROUND_TERMS.targetAmountUSD.toLocaleString()} USD</span>
              </div>
            </div>

            {/* 3 Core Highlight Cards ($25,000 / 25%) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="text-xs text-slate-400 font-medium">{t.proposal.targetAmount}</div>
                <div className="text-3xl font-extrabold text-white font-['Outfit']">
                  ${SEED_ROUND_TERMS.targetAmountUSD.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  {language === 'ru' ? '100% средств направляются на продукты и юридическое сопровождение.' : '100% of capital allocated to product scaling & legal.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
                  <Percent className="w-6 h-6" />
                </div>
                <div className="text-xs text-slate-400 font-medium">{t.proposal.maxEquity}</div>
                <div className="text-3xl font-extrabold text-white font-['Outfit']">
                  {language === 'ru' ? `до ${SEED_ROUND_TERMS.maxEquityPercent}%` : `up to ${SEED_ROUND_TERMS.maxEquityPercent}%`}
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  {language === 'ru' ? 'Прямая фиксация доли компании в инвестиционном соглашении.' : 'Direct equity allocation in formal investment agreement.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 w-fit">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-xs text-slate-400 font-medium">{t.proposal.minTicket}</div>
                <div className="text-3xl font-extrabold text-white font-['Outfit']">
                  ${SEED_ROUND_TERMS.minInvestmentUSD.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  {language === 'ru' ? 'Доступно для приватных инвесторов и бизнес-ангелов.' : 'Available for angel investors and syndicates.'}
                </p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ru' ? 'Юридическая оформляемость. Без брокерских комиссий.' : 'Full legal structure. Zero broker fees.'}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onOpenMemorandum}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>{t.proposal.memoBtn}</span>
                </button>

                <button
                  onClick={onOpenSchedule}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.proposal.ctaBtn}</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
