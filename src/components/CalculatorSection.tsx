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
  Zap
} from 'lucide-react';
import { SEED_ROUND_TERMS } from '../data/novaboost-data';

interface CalculatorSectionProps {
  onScheduleWithAmount: (amount: number) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onScheduleWithAmount }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);

  // Quick preset options
  const presets = [3000, 5000, 7000, 10000];

  // Calculation formulas based strictly on current Seed Round terms
  const targetUSD = SEED_ROUND_TERMS.targetAmountUSD; // 10,000
  const maxEquity = SEED_ROUND_TERMS.maxEquityPercent; // 10.0%
  const minTicket = SEED_ROUND_TERMS.minInvestmentUSD; // 3,000

  // Calculate Equity Share (%): (Amount / 10,000) * 10%
  const calculatedEquity = Math.min(
    ((investmentAmount / targetUSD) * maxEquity),
    maxEquity
  );

  // Implied valuation: Amount / (Equity / 100)
  const impliedValuation = SEED_ROUND_TERMS.impliedValuationUSD; // $100,000

  // Handle slider or text change
  const handleAmountChange = (val: number) => {
    const clamped = Math.max(0, Math.min(10000, val));
    setInvestmentAmount(clamped);
  };

  const isBelowMin = investmentAmount < minTicket;

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide">
            <Calculator className="w-3.5 h-3.5" />
            <span>Иннвационный Модуль</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Онлайн-Калькулятор <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Инвестора</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Интерактивный расчёт предполагаемой доли в компании на основе параметров раунда Seed 2026.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="glass-panel gradient-border rounded-3xl p-6 sm:p-10 border border-white/15 space-y-8 shadow-2xl bg-[#0b1220]/90">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Сумма планируемой инвестиции (USD)</span>
                  <span className="text-xs font-mono text-cyan-400">Мин. чек: $3,000 USD</span>
                </label>

                {/* Amount Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    step={500}
                    value={investmentAmount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="w-full pl-11 pr-24 py-4 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 text-white font-extrabold text-2xl font-['Outfit'] focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-mono font-semibold text-slate-400">
                    USD
                  </div>
                </div>

                {/* Range Slider */}
                <div className="pt-2 space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={100}
                    value={investmentAmount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>$0</span>
                    <span>$3,000 (Min)</span>
                    <span>$5,000</span>
                    <span>$7,500</span>
                    <span>$10,000 (Max)</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400">Быстрый выбор билета:</span>
                <div className="grid grid-cols-4 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleAmountChange(preset)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
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
                  <span>Обратите внимание: минимальный инвестиционный чек текущего раунда составляет $3,000 USD.</span>
                </div>
              )}

            </div>

            {/* Results Display Column */}
            <div className="lg:col-span-5 space-y-4 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-indigo-950/30 to-slate-900 border border-cyan-500/30">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                  Расчётные показатели
                </span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Equity Share Result */}
              <div className="space-y-1">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Предполагаемая доля компании</span>
                </div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 font-['Outfit']">
                  {calculatedEquity.toFixed(2)}%
                </div>
              </div>

              {/* Implied Valuation */}
              <div className="pt-2 space-y-1 border-t border-white/5">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Оценка компании (Post-Money)</span>
                </div>
                <div className="text-xl font-bold text-white font-['Outfit']">
                  ${impliedValuation.toLocaleString()} USD
                </div>
              </div>

              {/* Legal Structure */}
              <div className="pt-2 space-y-1 border-t border-white/5">
                <div className="text-[11px] text-slate-400">Формат сделки:</div>
                <div className="text-xs font-semibold text-cyan-200">
                  {SEED_ROUND_TERMS.legalStructure}
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
                <span>Забронировать ${investmentAmount.toLocaleString()} USD</span>
              </button>

            </div>

          </div>

          {/* REQUIRED DISCLAIMER NOTICE */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-300">
                ВАЖНОЕ ПРЕДУПРЕЖДЕНИЕ:
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                "Расчёт является ознакомительным. Финальные условия фиксируются инвестиционным соглашением." Никакие показатели на данном сайте не являются публичной офертой или гарантией окупаемости.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
