import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  Sparkles,
  Check,
  Zap,
  Building2,
  Laptop,
  Smartphone,
  GraduationCap,
  HelpCircle,
  Eye,
  BarChart3
} from 'lucide-react';
import { SEED_ROUND_TERMS } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface CalculatorSectionProps {
  onScheduleWithAmount: (amount: number) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onScheduleWithAmount }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const [investmentAmount, setInvestmentAmount] = useState<number>(3000);

  // Quick preset options
  const presets = [3000, 5000, 10000, 25000];

  // Calculation formulas based strictly on Seed Round terms
  const maxTargetUSD = SEED_ROUND_TERMS.targetAmountUSD; // 25,000
  const maxEquity = SEED_ROUND_TERMS.maxEquityPercent; // 25.0%
  const minTicket = SEED_ROUND_TERMS.minInvestmentUSD; // 3,000
  const impliedValuation = SEED_ROUND_TERMS.impliedValuationUSD; // 100,000

  // Calculate Equity Share (%): (Amount / Valuation) * 100%
  const calculatedEquity = Math.min(
    (investmentAmount / impliedValuation) * 100,
    maxEquity
  );

  // Projected Monthly Net Profit model
  const agencyNetMonthly = 4000;
  const desktopNetMonthly = 1900;
  const mobileNetMonthly = 500;
  const academyNetMonthly = 950;

  const totalProjectedNetMonthly = agencyNetMonthly + desktopNetMonthly + mobileNetMonthly + academyNetMonthly; // $7,350/mo
  const totalProjectedNetYearly = totalProjectedNetMonthly * 12; // $88,200/yr

  // Investor Dividend calculation
  const investorMonthlyDividend = totalProjectedNetMonthly * (calculatedEquity / 100);
  const investorYearlyDividend = totalProjectedNetYearly * (calculatedEquity / 100);
  const annualReturnPercent = investmentAmount > 0 ? (investorYearlyDividend / investmentAmount) * 100 : 0;

  // Handle slider or text change
  const handleAmountChange = (val: number) => {
    const clamped = Math.max(0, Math.min(maxTargetUSD, val));
    setInvestmentAmount(clamped);
  };

  const isBelowMin = investmentAmount < minTicket;

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.calculator.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">{t.calculator.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* MAIN QUESTION PROMINENT BANNER */}
        <div className="glass-panel gradient-border rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900/90 to-indigo-950/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  {language === 'ru' ? 'Главный Вопрос Инвестора' : 'Core Investor Question'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  {t.calculator.mainQuestionTitle} <span className="text-cyan-300 font-extrabold">${investmentAmount.toLocaleString()} USD</span> — {t.calculator.mainQuestionSub}
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-right self-end md:self-auto">
              <div className="text-[10px] font-mono text-slate-400 uppercase">{t.calculator.yourShareLabel}</div>
              <div className="text-xl font-extrabold text-cyan-300 font-mono">{calculatedEquity.toFixed(2)}%</div>
            </div>
          </div>

          {/* Quick Projected Output Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[11px] font-mono text-slate-400">{t.calculator.totalEcosystemNet}</span>
              <div className="text-xl font-bold text-white font-['Outfit']">
                ~${totalProjectedNetMonthly.toLocaleString()} <span className="text-xs text-slate-400 font-normal">{t.calculator.perMonth}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500">~$88,200 USD {t.calculator.perYear}</div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-cyan-950/40 border border-cyan-500/40 space-y-1">
              <span className="text-[11px] font-mono text-cyan-300 font-semibold">{t.calculator.monthlyDividendsLabel} ({calculatedEquity.toFixed(1)}%)</span>
              <div className="text-2xl font-extrabold text-cyan-300 font-['Outfit']">
                ~${investorMonthlyDividend.toFixed(0)} USD
              </div>
              <div className="text-[10px] font-mono text-cyan-200">
                ~{Math.round(investorMonthlyDividend * 100).toLocaleString('ru-RU')} ₽ {t.calculator.perMonth}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-indigo-950/40 border border-indigo-500/40 space-y-1">
              <span className="text-[11px] font-mono text-indigo-300 font-semibold">{t.calculator.yearlyDividendsLabel}</span>
              <div className="text-2xl font-extrabold text-indigo-200 font-['Outfit']">
                ~${investorYearlyDividend.toLocaleString()} USD
              </div>
              <div className="text-[10px] font-mono text-indigo-300">{language === 'ru' ? 'Ориентир 1-го года' : 'Y1 Target'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">{t.calculator.paybackLabel}</span>
              <div className="text-2xl font-extrabold text-emerald-300 font-['Outfit']">
                ~{annualReturnPercent.toFixed(0)}% <span className="text-xs font-normal">{t.calculator.perYear}</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400/80">{language === 'ru' ? 'Возврат тела ~13.5 мес' : 'Principal Return ~13.5 mos'}</div>
            </div>
          </div>
        </div>

        {/* Calculator Main Interactive Inputs + Target Ecosystem Model Breakdown */}
        <div className="glass-panel gradient-border rounded-3xl p-6 sm:p-10 border border-white/15 space-y-10 shadow-2xl bg-[#0b1220]/90">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls Column */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{t.calculator.selectAmountLabel}</span>
                  <span className="text-xs font-mono text-cyan-400">{t.calculator.minTicketNotice}</span>
                </label>

                {/* Amount Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={maxTargetUSD}
                    step={500}
                    value={investmentAmount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="w-full pl-11 pr-24 py-4 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 text-white font-extrabold text-2xl font-['Outfit'] focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-mono font-semibold text-slate-400">
                    USD
                  </div>
                </div>

                {/* Range Slider up to $25,000 */}
                <div className="pt-2 space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={maxTargetUSD}
                    step={250}
                    value={investmentAmount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>$0</span>
                    <span className="text-cyan-400 font-bold">$3,000 (3%)</span>
                    <span>$10,000 (10%)</span>
                    <span>$15,000 (15%)</span>
                    <span className="text-indigo-300 font-extrabold">$25,000 (25%)</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400">{t.calculator.quickSelect}</span>
                <div className="grid grid-cols-4 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleAmountChange(preset)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                        investmentAmount === preset
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md'
                          : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/5'
                      }`}
                    >
                      ${preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Validation Note if below minimum */}
              {isBelowMin && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{t.calculator.minNotice}</span>
                </div>
              )}

            </div>

            {/* Results Display Column */}
            <div className="lg:col-span-6 space-y-4 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-indigo-950/30 to-slate-900 border border-cyan-500/30">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  {t.calculator.investorProfileTitle}
                </span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Equity Share Result */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t.calculator.shareInCompany}</span>
                  </div>
                  <div className="text-3xl font-extrabold text-cyan-300 font-['Outfit']">
                    {calculatedEquity.toFixed(2)}%
                  </div>
                </div>

                {/* Implied Valuation */}
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{t.calculator.postMoneyValuation}</span>
                  </div>
                  <div className="text-xl font-bold text-white font-['Outfit']">
                    ${impliedValuation.toLocaleString()} USD
                  </div>
                </div>
              </div>

              {/* Calculated Expected Dividend */}
              <div className="pt-3 border-t border-white/10 space-y-1">
                <div className="text-xs text-slate-300 flex items-center justify-between">
                  <span>{t.calculator.estimatedDividends} ({calculatedEquity.toFixed(1)}%):</span>
                  <span className="font-mono text-cyan-300 font-bold">~${investorMonthlyDividend.toFixed(0)} USD{t.calculator.perMonth}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {language === 'ru' ? 'В год:' : 'Per year:'} <span className="text-white font-bold font-mono">~${investorYearlyDividend.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={isBelowMin}
                onClick={() => onScheduleWithAmount(investmentAmount)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isBelowMin
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-xl shadow-cyan-500/25'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{t.calculator.bookTicketBtn} ${investmentAmount.toLocaleString()} USD ({calculatedEquity.toFixed(1)}%)</span>
              </button>

            </div>

          </div>

          {/* TARGET ECOSYSTEM MODEL BREAKDOWN */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>{t.calculator.breakdownTitle}</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">{t.calculator.fourProductsModel}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Agency */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{t.calculator.agencyProduct}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {t.calculator.agencyDesc}
                </p>
              </div>

              {/* Desktop */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                  <Laptop className="w-4 h-4 text-indigo-400" />
                  <span>{t.calculator.desktopProduct}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {t.calculator.desktopDesc}
                </p>
              </div>

              {/* Mobile */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  <span>{t.calculator.mobileProduct}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {t.calculator.mobileDesc}
                </p>
              </div>

              {/* Academy */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>{t.calculator.academyProduct}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {t.calculator.academyDesc}
                </p>
              </div>
            </div>
          </div>

          {/* MANDATORY EXPLICIT DISCLAIMER & PERSONAL CABINET TRANSPARENCY NOTICE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{t.calculator.disclaimerTitle}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t.calculator.disclaimerBody}
            </p>
            <div className="pt-1 flex items-center gap-2 text-cyan-300 text-[11px] font-semibold">
              <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{t.calculator.personalCabinetNotice}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
