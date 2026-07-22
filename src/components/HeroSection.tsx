import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  TrendingUp, 
  Layers, 
  DollarSign, 
  Percent, 
  Award,
  ChevronDown
} from 'lucide-react';
import { SEED_ROUND_TERMS } from '../data/novaboost-data';

interface HeroSectionProps {
  onOpenMemorandum: () => void;
  onOpenSchedule: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenMemorandum, onOpenSchedule }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas animated abstract dark mesh / particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for abstract mesh
    const particleCount = Math.min(Math.floor(width / 25), 45);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background radial glow
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.65
      );
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.08)');
      gradient.addColorStop(0.4, 'rgba(99, 102, 241, 0.04)');
      gradient.addColorStop(1, 'rgba(8, 11, 17, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect particles with lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 160) * 0.12})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="overview" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Decorative blurred glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Официальное Инвестиционное Предложение</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-cyan-400">2026</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-['Outfit']">
                Построение Стриминговой{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  Экосистемы Нового Поколения
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                NovaBoost объединяет B2B агентство, десктопный и мобильный софт, ИИ-инструменты и транзакционный шлюз в единую устойчивую экосистему для стримеров, брендов и зрителей.
              </p>
            </motion.div>

            {/* Quick Value Points */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2"
            >
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Продуктов</div>
                  <div className="text-sm font-bold text-white">7 Модулей</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Монетизация</div>
                  <div className="text-sm font-bold text-white">Диверсифицирована</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Код & IP</div>
                  <div className="text-sm font-bold text-white">100% In-House</div>
                </div>
              </div>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenMemorandum}
                className="group relative px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Скачать Меморандум (PDF / TXT)</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenSchedule}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-cyan-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Связаться с Основателем</span>
              </button>
            </motion.div>

            {/* Verification Tag */}
            <p className="text-xs text-slate-400 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Официальный Seed-раунд 2026. Без фиктивных метрик. Все данные соответствуют меморандуму.
            </p>

          </div>

          {/* Right Hero Column: Seed Round Highlight Card */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-cyan-500/30 via-indigo-500/20 to-transparent blur-xl opacity-70" />

              <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 shadow-2xl">
                
                {/* Header Card */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                      Инвестиционный Раунд
                    </span>
                    <h3 className="text-xl font-bold text-white font-['Outfit']">
                      {SEED_ROUND_TERMS.roundName}
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Открыт для участия</span>
                  </div>
                </div>

                {/* Main Terms Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Amount */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Объем раунда</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white font-['Outfit']">
                      $10,000 <span className="text-xs font-normal text-slate-400">USD</span>
                    </div>
                  </div>

                  {/* Max Equity */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Percent className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Максимальная доля</span>
                    </div>
                    <div className="text-2xl font-extrabold text-white font-['Outfit']">
                      до 10%
                    </div>
                  </div>

                  {/* Min Investment */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Award className="w-3.5 h-3.5 text-sky-400" />
                      <span>Мин. инвестиция</span>
                    </div>
                    <div className="text-xl font-bold text-white font-['Outfit']">
                      $3,000 <span className="text-xs font-normal text-slate-400">USD</span>
                    </div>
                  </div>

                  {/* Implied Valuation */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                      <span>Оценка проекта</span>
                    </div>
                    <div className="text-xl font-bold text-white font-['Outfit']">
                      $100,000 <span className="text-xs font-normal text-slate-400">USD</span>
                    </div>
                  </div>
                </div>

                {/* Key Legal Note */}
                <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Юридическое оформление</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Прямое инвестиционное соглашение / Convertible Note / SAFE. Фиксация доли и прав инвестора.
                  </p>
                </div>

                {/* Quick Interactive Button to Calculator */}
                <button
                  onClick={() => scrollToSection('calculator')}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Рассчитать долю в Калькуляторе Инвестора</span>
                  <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                </button>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
