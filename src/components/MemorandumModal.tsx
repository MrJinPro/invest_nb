import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  X, 
  Download, 
  CheckCircle2, 
  Shield, 
  Lock, 
  BookOpen, 
  ChevronRight, 
  ArrowDownToLine,
  Sparkles,
  Presentation,
  Scale
} from 'lucide-react';
import { DocumentItem, SEED_ROUND_TERMS } from '../data/novaboost-data';
import { FULL_MEMORANDUM_TEXT } from '../data/full-memorandum';
import { PITCH_DECK_TEXT } from '../data/pitch-deck';
import { INVESTOR_AGREEMENT_TEXT } from '../data/investor-agreement';

interface MemorandumModalProps {
  isOpen: boolean;
  onClose: () => void;
  document?: DocumentItem | null;
}

export const MemorandumModal: React.FC<MemorandumModalProps> = ({ 
  isOpen, 
  onClose, 
  document: docItem 
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  // Determine document content and metadata based on document ID
  const docId = docItem?.id || 'memo';

  let docTitle = 'Инвестиционный Меморандум NovaBoost Seed 2026';
  let docBadge = 'Официальный Меморандум (55 страниц)';
  let docIcon = <FileText className="w-6 h-6 text-cyan-400" />;
  let textContent = FULL_MEMORANDUM_TEXT;
  let downloadFileName = 'Инвестиционный_Меморандум_NovaBoost_2026.txt';
  let buttonLabel = 'Скачать Полный Меморандум';

  if (docId === 'deck') {
    docTitle = 'NovaBoost Pitch Deck 2026 (Презентация)';
    docBadge = 'Инвестиционный Питч-дек (Слайды)';
    docIcon = <Presentation className="w-6 h-6 text-indigo-400" />;
    textContent = PITCH_DECK_TEXT;
    downloadFileName = 'NovaBoost_Pitch_Deck_2026.txt';
    buttonLabel = 'Скачать Питч-дек';
  } else if (docId === 'terms') {
    docTitle = 'Term Sheet & Legal Framework (Инвестиционное Соглашение)';
    docBadge = 'Типовой Юридический Договор';
    docIcon = <Scale className="w-6 h-6 text-sky-400" />;
    textContent = INVESTOR_AGREEMENT_TEXT;
    downloadFileName = 'Term_Sheet_Инвестиционное_Соглашение_NovaBoost_2026.txt';
    buttonLabel = 'Скачать Инвестиционное Соглашение';
  }

  const handleDownload = () => {
    setDownloaded(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (err) {}

    // Trigger complete official Russian text file download for selected document
    const element = document.createElement("a");
    const file = new Blob([textContent], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = downloadFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel gradient-border rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-white/20 space-y-6 relative max-h-[90vh] flex flex-col bg-[#090f1d]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                {docIcon}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  {docBadge}
                </span>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  {docTitle}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Parameters Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">Объем Раунда</span>
              <span className="font-bold text-cyan-300">$10,000 USD</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">Доля Инвесторам</span>
              <span className="font-bold text-indigo-300">До 10%</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">Мин. Чек</span>
              <span className="font-bold text-sky-300">$3,000 USD</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block">Оценка Проекта</span>
              <span className="font-bold text-emerald-300">$100,000 USD</span>
            </div>
          </div>

          {/* Full Text Scrollable Reader */}
          <div className="p-5 rounded-2xl bg-[#050811] border border-white/10 space-y-4 text-xs text-slate-300 leading-relaxed overflow-y-auto flex-1 font-mono whitespace-pre-wrap select-text">
            {textContent}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Официальный Юридический Документ • NovaBoost 2026</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="/NovaBoost_Seed_Round_2026.pdf"
                download="NovaBoost Seed Round 2026.pdf"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Скачать PDF (55 стр)</span>
              </a>

              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>{downloaded ? 'Текст Скачан!' : buttonLabel}</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

