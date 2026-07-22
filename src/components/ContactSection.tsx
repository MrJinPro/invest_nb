import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  PhoneCall,
  Copy,
  Check,
  Video,
  ExternalLink,
  Inbox
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/novaboost-data';
import { addLead, generateTelegramLink, generateMailtoLink, Lead } from '../data/leadsStore';

interface ContactSectionProps {
  onOpenSchedule: () => void;
  onOpenLeadsModal?: () => void;
  initialInvestmentAmount?: number;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  onOpenSchedule, 
  onOpenLeadsModal,
  initialInvestmentAmount 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investmentAmount: initialInvestmentAmount || 5000,
    message: '',
    captchaCode: '',
    userCaptchaAnswer: ''
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastCreatedLead, setLastCreatedLead] = useState<Lead | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Simple math CAPTCHA challenge
  const [captchaNum1] = useState(4);
  const [captchaNum2] = useState(3);
  const expectedCaptchaSum = captchaNum1 + captchaNum2; // 7

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form Validations
    if (!formData.name.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Пожалуйста, укажите корректный email адрес.');
      return;
    }
    if (parseInt(formData.userCaptchaAnswer) !== expectedCaptchaSum) {
      setErrorMessage(`Ошибка капчи: Сколько будет ${captchaNum1} + ${captchaNum2}?`);
      return;
    }

    setStatus('submitting');

    // Create lead in local & server database
    const newLead = addLead({
      type: 'investment',
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      investmentAmount: formData.investmentAmount,
      message: formData.message.trim()
    });

    setLastCreatedLead(newLead);

    setTimeout(() => {
      setStatus('success');
      
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 600);
  };

  const copyLeadSummaryText = () => {
    if (!lastCreatedLead) return;
    const text = `Инвестиционная заявка NovaBoost Seed Round 2026:
Имя: ${formData.name}
Email: ${formData.email}
Сумма билета: $${formData.investmentAmount.toLocaleString()} USD
Компания: ${formData.company || '—'}
Сообщение: ${formData.message || '—'}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="contacts" className="py-24 relative overflow-hidden bg-[#0a0e17]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <Mail className="w-3.5 h-3.5" />
            <span>Связь с Проектом</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Контакты и <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Форма Заявки</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Свяжитесь с основателем NovaBoost напрямую или назначьте персональную онлайн-встречу.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Founder Profile & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              
              {/* Profile Card */}
              <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
                    <div className="w-full h-full bg-[#080d1a] rounded-[14px] flex items-center justify-center text-cyan-300 font-extrabold text-2xl font-['Outfit']">
                      NB
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#080d1a]" title="Online"></span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    {FOUNDER_INFO.name}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400">
                    {FOUNDER_INFO.role}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {FOUNDER_INFO.location}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {FOUNDER_INFO.bio}
              </p>

              {/* Contact Channels List */}
              <div className="space-y-3 pt-2">
                
                {/* Email */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">Email:</div>
                      <div className="text-xs font-bold text-white">{FOUNDER_INFO.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(FOUNDER_INFO.email, 'email')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Копировать Email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Telegram */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">Telegram:</div>
                      <div className="text-xs font-bold text-white">{FOUNDER_INFO.telegram}</div>
                    </div>
                  </div>

                  <a
                    href={`https://t.me/${FOUNDER_INFO.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 text-xs font-semibold transition-colors"
                  >
                    Написать
                  </a>
                </div>

                {/* TikTok Agency */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">TikTok Agency:</div>
                      <div className="text-xs font-bold text-white">{FOUNDER_INFO.tiktok}</div>
                    </div>
                  </div>

                  <a
                    href={`https://www.tiktok.com/${FOUNDER_INFO.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 text-xs font-semibold transition-colors"
                  >
                    Перейти
                  </a>
                </div>

              </div>

              {/* Schedule Call CTA */}
              <button
                onClick={onOpenSchedule}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Запланировать Онлайн-Встречу с Основателем</span>
              </button>

            </div>

          </div>

          {/* Right Column: Information Request Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel gradient-border rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Инвестиционная Заявка
                </span>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">
                  Запрос Инвестиционного Пакета
                </h3>
                <p className="text-xs text-slate-400">
                  Оставьте контакты для получения полной документации и обсуждения параметров участия.
                </p>
              </div>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-5"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-bold text-white font-['Outfit']">Заявка Зарегистрирована в Реестре!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Ваша заявка на <strong className="text-cyan-300">${formData.investmentAmount.toLocaleString()} USD</strong> зафиксирована в базе. Чтобы гарантированно уведомить Основателя, отправьте сообщение прямо сейчас:
                    </p>
                  </div>

                  {lastCreatedLead && (
                    <div className="space-y-2 pt-2 max-w-md mx-auto text-left">
                      <a
                        href={generateTelegramLink(lastCreatedLead)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>💬 Отправить в Telegram Основателю (@MrJinPro)</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>

                      <a
                        href={generateMailtoLink(lastCreatedLead)}
                        className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                      >
                        <Mail className="w-4 h-4 text-indigo-400" />
                        <span>✉️ Отправить письмо на admin@novaboost.cloud</span>
                      </a>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={copyLeadSummaryText}
                          className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSummary ? 'Скопировано!' : 'Скопировать текст'}</span>
                        </button>

                        {onOpenLeadsModal && (
                          <button
                            onClick={onOpenLeadsModal}
                            className="py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Inbox className="w-3.5 h-3.5" />
                            <span>Реестр Заявок</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-medium cursor-pointer"
                    >
                      Подать еще одну заявку
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">
                        Ваше Имя <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Александр"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="investor@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">
                        Компания / Фонд (опционально)
                      </label>
                      <input
                        type="text"
                        placeholder="Ventures Capital"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>

                    {/* Investment Amount */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">
                        Планируемая сумма (USD)
                      </label>
                      <select
                        value={formData.investmentAmount}
                        onChange={(e) => setFormData({ ...formData, investmentAmount: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0d1527] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-all"
                      >
                        <option value={3000}>$3,000 USD (Min Ticket)</option>
                        <option value={5000}>$5,000 USD (5% equity)</option>
                        <option value={7000}>$7,000 USD (7% equity)</option>
                        <option value={10000}>$10,000 USD (Max 10% equity)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">
                      Сообщение / Вопросы (опционально)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Интересуют детали юрисдикции и графики следующих релизов..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 transition-all"
                    ></textarea>
                  </div>

                  {/* Anti-spam CAPTCHA */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                    <span className="text-xs font-mono text-slate-300">
                      Защита от спама: Сколько будет {captchaNum1} + {captchaNum2}?
                    </span>
                    <input
                      type="number"
                      required
                      placeholder="?"
                      value={formData.userCaptchaAnswer}
                      onChange={(e) => setFormData({ ...formData, userCaptchaAnswer: e.target.value })}
                      className="w-16 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs text-center font-bold focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Отправка...' : 'Запросить Информацию'}</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center leading-normal">
                    Все поступающие заявки доставляются Основателю проекта напрямую на <strong className="text-cyan-400">admin@novaboost.cloud</strong> и в Telegram <strong className="text-cyan-400">@MrJinPro</strong>.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
