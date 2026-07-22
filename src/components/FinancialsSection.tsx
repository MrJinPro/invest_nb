import React from 'react';
import { motion } from 'motion/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PieChart, DollarSign, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { REVENUE_STRUCTURE, USE_OF_FUNDS } from '../data/novaboost-data';

ChartJS.register(ArcElement, Tooltip, Legend);

export const FinancialsSection: React.FC = () => {
  // Donut chart config for Revenue Structure
  const revenueChartData = {
    labels: REVENUE_STRUCTURE.categories.map(c => c.label),
    datasets: [
      {
        data: REVENUE_STRUCTURE.categories.map(c => c.value),
        backgroundColor: REVENUE_STRUCTURE.categories.map(c => c.color),
        borderColor: '#080b11',
        borderWidth: 3,
        hoverOffset: 6
      }
    ]
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    cutout: '72%'
  };

  // Allocation Donut Chart
  const allocationChartData = {
    labels: USE_OF_FUNDS.map(u => u.name),
    datasets: [
      {
        data: [35, 25, 20, 10, 10], // Operational focus structure
        backgroundColor: USE_OF_FUNDS.map(u => u.color),
        borderColor: '#080b11',
        borderWidth: 3,
        hoverOffset: 6
      }
    ]
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#080b11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <PieChart className="w-3.5 h-3.5" />
            <span>Финансовая Структура & Использование Средств</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Финансовая Модель и <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Инвестиции</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Прозрачное разделение структуры потоков доходов и строго целевое использование привлеченных инвестиций Seed-раунда.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Revenue Structure */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Типы выручки
              </span>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Структура Доходов (Revenue Structure)
              </h3>
              <p className="text-xs text-slate-400">
                Баланс между прогнозируемой регулярной SaaS-выручкой и масштабируемым транзакционным оборотом.
              </p>
            </div>

            {/* Donut Chart Display */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
              <div className="w-48 h-48 relative shrink-0">
                <Doughnut data={revenueChartData} options={revenueChartOptions} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-mono">Баланс</span>
                  <span className="text-lg font-bold text-white font-['Outfit']">Revenue</span>
                </div>
              </div>

              <div className="space-y-3 w-full">
                {REVENUE_STRUCTURE.categories.map((cat, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                      <span className="text-xs font-semibold text-white">{cat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs text-slate-300">
              <span className="font-semibold text-cyan-300">Отказ от фиктивных прогнозов:</span> Настоящий блок отображает фундаментальную бизнес-модель без вымышленных финансовых графиков экстраполяции.
            </div>
          </motion.div>

          {/* Card 2: Use of Funds */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                Целевое назначение
              </span>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Использование Инвестиций ($10,000 USD)
              </h3>
              <p className="text-xs text-slate-400">
                Распределение ресурсов Seed-раунда на ключевые производственные направления.
              </p>
            </div>

            {/* Donut Chart Display for Use of Funds */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
              <div className="w-48 h-48 relative shrink-0">
                <Doughnut data={allocationChartData} options={revenueChartOptions} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400 font-mono">Раунд</span>
                  <span className="text-lg font-bold text-cyan-400 font-['Outfit']">$10,000</span>
                </div>
              </div>

              <div className="space-y-2 w-full">
                {USE_OF_FUNDS.map((fund, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: fund.color }}></span>
                      <span className="text-xs font-bold text-white">{fund.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 pl-4">{fund.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/15 text-xs text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Финансовые потоки контролируются и фиксируются инвестиционным договором.</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
