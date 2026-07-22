import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Inbox, 
  Download, 
  Trash2, 
  Send, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  User, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Plus, 
  Copy, 
  Check, 
  Building,
  ExternalLink,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { 
  Lead, 
  getLeads, 
  updateLeadStatus, 
  deleteLead, 
  clearAllLeads, 
  exportLeadsCSV, 
  addLead,
  generateTelegramLink,
  generateMailtoLink
} from '../data/leadsStore';

interface LeadsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadsAdminModal: React.FC<LeadsAdminModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'meeting' | 'investment'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2026' || pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const loadAll = () => {
    setIsRefreshing(true);
    // 1. Load from localStorage
    const local = getLeads();
    setLeads(local);

    // 2. Fetch from backend API
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.leads)) {
          // Merge server leads with local leads
          const mergedMap = new Map<string, Lead>();
          local.forEach(l => mergedMap.set(l.id, l));
          data.leads.forEach((l: Lead) => mergedMap.set(l.id, l));
          const combined = Array.from(mergedMap.values()).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setLeads(combined);
        }
      })
      .catch(() => {})
      .finally(() => setIsRefreshing(false));
  };

  useEffect(() => {
    if (isOpen) {
      loadAll();
    }

    const handleUpdate = () => loadAll();
    window.addEventListener('novaboost_leads_updated', handleUpdate);
    return () => window.removeEventListener('novaboost_leads_updated', handleUpdate);
  }, [isOpen]);

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel gradient-border rounded-3xl max-w-md w-full p-6 sm:p-8 border border-white/20 space-y-6 relative bg-[#090f1d] text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Панель Заявок Основателя
              </h3>
              <p className="text-xs text-slate-400">
                Введите PIN-код доступа для просмотра реестра заявок
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="PIN-код (по умолчанию: 2026)"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                className={`w-full text-center tracking-widest text-lg font-mono px-4 py-3 rounded-xl bg-white/5 border ${
                  pinError ? 'border-rose-500/80 text-rose-300' : 'border-white/10 text-white'
                } focus:outline-none focus:border-cyan-400`}
                autoFocus
              />

              {pinError && (
                <div className="text-xs text-rose-400 font-medium">
                  Неверный PIN-код доступа
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors cursor-pointer"
              >
                Войти в Реестр
              </button>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  const handleStatusChange = (id: string, newStatus: Lead['status']) => {
    updateLeadStatus(id, newStatus);
    loadAll();
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить эту заявку?')) {
      deleteLead(id);
      loadAll();
    }
  };

  const handleClearAll = () => {
    if (confirm('Вы уверены, что хотите полностью очистить список заявок?')) {
      clearAllLeads();
      loadAll();
    }
  };

  const handleAddDemoLead = () => {
    addLead({
      type: 'investment',
      name: 'Алексей Смирнов',
      email: 'investor.demo@novaboost.io',
      telegram: '@alex_investor',
      phone: '+7 (999) 123-45-67',
      company: 'Nordic Tech Fund',
      investmentAmount: 10000,
      message: 'Заинтересован в выкупе билета $10,000 USD (10% доли). Прошу прислать реквизиты договора.'
    });
    loadAll();
  };

  const filteredLeads = leads.filter(l => {
    if (filter === 'new') return l.status === 'new';
    if (filter === 'meeting') return l.type === 'meeting';
    if (filter === 'investment') return l.type === 'investment';
    return true;
  });

  const copyContact = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel gradient-border rounded-3xl max-w-5xl w-full p-6 sm:p-8 border border-white/20 space-y-6 relative max-h-[92vh] flex flex-col bg-[#090f1d]"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 relative">
                <Inbox className="w-6 h-6" />
                {newLeadsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-black text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                    {newLeadsCount}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Реестр Инвесторов & Лидов NovaBoost
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                    Синхронизировано
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <span>Панель Заявок Основателя</span>
                  <span className="text-xs text-slate-400 font-normal">({leads.length} всего)</span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={loadAll}
                title="Обновить список"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/5 w-full sm:w-auto overflow-x-auto text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filter === 'all' ? 'bg-cyan-500 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Все ({leads.length})
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filter === 'new' ? 'bg-cyan-500 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Новые ({newLeadsCount})
              </button>
              <button
                onClick={() => setFilter('investment')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filter === 'investment' ? 'bg-cyan-500 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Заявки ({leads.filter(l => l.type === 'investment').length})
              </button>
              <button
                onClick={() => setFilter('meeting')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  filter === 'meeting' ? 'bg-cyan-500 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Созвоны ({leads.filter(l => l.type === 'meeting').length})
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleAddDemoLead}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>+ Демо заявка</span>
              </button>

              <button
                onClick={exportLeadsCSV}
                disabled={leads.length === 0}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              {leads.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Очистить</span>
                </button>
              )}
            </div>
          </div>

          {/* Leads List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {filteredLeads.length === 0 ? (
              <div className="py-16 text-center space-y-3 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">Заявок в этой категории пока нет.</p>
                <button
                  onClick={handleAddDemoLead}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold"
                >
                  Создать тестовую заявку
                </button>
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                    lead.status === 'new'
                      ? 'bg-gradient-to-r from-cyan-500/10 via-slate-900/60 to-indigo-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Lead Top Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider ${
                        lead.type === 'meeting'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {lead.type === 'meeting' ? '📹 Созвон 1-on-1' : '💰 Инвест. Заявка'}
                      </span>

                      {lead.investmentAmount && (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
                          ${lead.investmentAmount.toLocaleString()} USD
                        </span>
                      )}

                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(lead.createdAt).toLocaleString('ru-RU')}
                      </span>
                    </div>

                    {/* Status selector */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-[10px] text-slate-400 font-mono">Статус:</span>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium focus:outline-none border cursor-pointer ${
                          lead.status === 'new'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                            : lead.status === 'contacted'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : lead.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="new" className="bg-[#090f1d] text-cyan-300">🔥 Новая</option>
                        <option value="contacted" className="bg-[#090f1d] text-amber-300">⏳ В работе</option>
                        <option value="completed" className="bg-[#090f1d] text-emerald-300">✅ Завершено</option>
                        <option value="archived" className="bg-[#090f1d] text-slate-400">📦 Архив</option>
                      </select>

                      <button
                        onClick={() => handleDelete(lead.id)}
                        title="Удалить"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">Имя и Компания:</div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{lead.name}</span>
                      </div>
                      {lead.company && (
                        <div className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">Контакты:</div>
                      <div className="text-slate-200 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-mono">{lead.email}</span>
                        <button
                          onClick={() => copyContact(lead.email, lead.id + '_email')}
                          className="text-slate-500 hover:text-white"
                        >
                          {copiedId === lead.id + '_email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      {lead.telegram && (
                        <div className="text-cyan-300 font-mono text-[11px] flex items-center gap-1">
                          <Send className="w-3 h-3 text-cyan-400" />
                          <span>{lead.telegram}</span>
                        </div>
                      )}

                      {lead.phone && (
                        <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">
                        {lead.type === 'meeting' ? 'Запланированное время:' : 'Запрошенные параметры:'}
                      </div>
                      {lead.selectedDate ? (
                        <div className="text-cyan-300 font-mono font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{lead.selectedDate} в {lead.selectedTime}</span>
                        </div>
                      ) : (
                        <div className="text-slate-300 font-mono">
                          Раунд: Seed 2026 ($10k)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  {lead.message && (
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-mono leading-relaxed">
                      <span className="text-slate-500 block text-[10px] uppercase font-sans font-bold">Комментарий инвестора:</span>
                      "{lead.message}"
                    </div>
                  )}

                  {/* Action Quick Bar */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href={generateTelegramLink(lead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Ответить в Telegram</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <a
                      href={generateMailtoLink(lead)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Написать на Email</span>
                    </a>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Все данные сохраняются локально + на сервере admin@novaboost.cloud</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold cursor-pointer"
            >
              Закрыть
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
