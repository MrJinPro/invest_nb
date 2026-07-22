import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Presentation,
  Scale
} from 'lucide-react';
import { INVESTMENT_DOCUMENTS, DocumentItem } from '../data/novaboost-data';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface DocumentsSectionProps {
  onSelectDocument: (doc: DocumentItem) => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ onSelectDocument }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const availableDocs = INVESTMENT_DOCUMENTS.filter(doc => doc.available);

  if (availableDocs.length === 0) return null;

  const getDocIcon = (id: string) => {
    if (id === 'deck') return <Presentation className="w-6 h-6 text-indigo-400" />;
    if (id === 'terms') return <Scale className="w-6 h-6 text-sky-400" />;
    return <FileText className="w-6 h-6 text-cyan-400" />;
  };

  return (
    <section id="documents" className="py-24 relative overflow-hidden bg-[#0a0e17]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <FileText className="w-3.5 h-3.5" />
            <span>{t.docs.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.docs.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t.docs.subtitle}
          </p>
        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableDocs.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    {getDocIcon(doc.id)}
                  </div>
                  <span className="px-2 py-1 rounded bg-white/5 text-slate-400 font-mono text-[10px]">
                    {doc.type} • {doc.size}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white font-['Outfit']">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>{language === 'ru' ? 'Открыть' : 'View'}</span>
                  </button>

                  <a
                    href="/NovaBoost_Seed_Round_2026.pdf"
                    download={doc.id === 'memo' ? "NovaBoost Seed Round 2026.pdf" : `${doc.title}.pdf`}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span>PDF (55 {language === 'ru' ? 'стр' : 'pgs'})</span>
                  </a>
                </div>

                <div className="text-[10px] font-mono text-slate-400 text-center">
                  {language === 'ru' ? 'Свежая версия (2026) • Проверено' : 'Latest version (2026) • Verified'}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
