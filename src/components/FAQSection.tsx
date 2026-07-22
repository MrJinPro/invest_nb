import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles,
  FileText
} from 'lucide-react';
import { FAQ_LIST, FaqItem } from '../data/novaboost-data';

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Investment', 'Product', 'Legal', 'Roadmap'];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? '' : id);
  };

  // Filter FAQs based on category and search query
  const filteredFaqs = FAQ_LIST.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 relative overflow-hidden bg-[#080b11]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Часто Задаваемые Вопросы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Вопросы и Ответы <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">(FAQ)</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Подробные разъяснения по условиям участия в раунде Seed 2026, продукту и юридическому оформлению.
          </p>
        </div>

        {/* Search & Filter bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по вопросам меморандума..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                    : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:text-slate-200'
                }`}
              >
                {cat === 'All' ? 'Все вопросы (18)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              Вопросов по вашему запросу не найдено.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`glass-panel rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-cyan-500/40 bg-[#0b1324]' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 select-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
                        {faq.category}
                      </span>
                      <span className="text-sm font-bold text-white font-['Outfit']">
                        {faq.question}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-300 shrink-0">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 pt-1 border-t border-white/5 text-xs text-slate-300 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
