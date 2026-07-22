import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Calendar, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles,
  Inbox
} from 'lucide-react';
import { getLeads } from '../data/leadsStore';

interface NavbarProps {
  onOpenMemorandum: () => void;
  onOpenSchedule: () => void;
  onOpenLeadsModal?: () => void;
}

export const NAV_ITEMS = [
  { label: 'Обзор', href: '#overview' },
  { label: 'Продукты', href: '#products' },
  { label: 'Рынок', href: '#market' },
  { label: 'Бизнес-модель', href: '#business-model' },
  { label: 'Инвестиции', href: '#investment' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Дорожная карта', href: '#roadmap' },
  { label: 'Документы', href: '#documents' },
  { label: 'Контакты', href: '#contacts' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenMemorandum, onOpenSchedule, onOpenLeadsModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadsCount, setLeadsCount] = useState(0);

  const refreshLeadsCount = () => {
    const leads = getLeads();
    setLeadsCount(leads.length);
  };

  useEffect(() => {
    refreshLeadsCount();
    window.addEventListener('novaboost_leads_updated', refreshLeadsCount);
    return () => window.removeEventListener('novaboost_leads_updated', refreshLeadsCount);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300">
      <div 
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0b0f19]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-950/20 py-2.5 px-4 sm:px-6' 
            : 'bg-transparent py-3 px-4 sm:px-6 border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#overview" 
            onClick={(e) => handleNavClick(e, '#overview')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
                <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-['Outfit']">
                  N
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight font-['Outfit'] text-white">
                  Nova<span className="text-cyan-400">Boost</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  SEED '26
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {onOpenLeadsModal && (
              <button
                onClick={onOpenLeadsModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all duration-200 active:scale-95 cursor-pointer relative"
                title="Панель Заявок"
              >
                <Inbox className="w-3.5 h-3.5 text-cyan-400" />
                <span>Заявки</span>
                {leadsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-950 font-extrabold text-[10px]">
                    {leadsCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={onOpenMemorandum}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-cyan-500/30 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Меморандум</span>
            </button>

            <button
              onClick={onOpenSchedule}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Связь с Основателем</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-[#0b0f19]/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl space-y-4"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    activeSection === item.href.replace('#', '')
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMemorandum();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Скачать Меморандум (PDF / TXT)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSchedule();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Запланировать Созвон с Основателем</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
