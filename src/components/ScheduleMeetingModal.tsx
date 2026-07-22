import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  X, 
  Send, 
  CheckCircle2, 
  User, 
  Mail, 
  Video, 
  Sparkles,
  DollarSign
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/novaboost-data';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAmount?: number;
}

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedAmount 
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-25');
  const [selectedTime, setSelectedTime] = useState<string>('15:00 UTC');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const timeslots = ['11:00 UTC', '14:00 UTC', '16:30 UTC', '19:00 UTC'];

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;

    setIsBooked(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (err) {}
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel gradient-border rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-white/20 space-y-6 relative max-h-[90vh] overflow-y-auto bg-[#090f1d]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                  Созвон с Основателем 1-on-1
                </span>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Запланировать Встречу
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

          {isBooked ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-white font-['Outfit']">Встреча Запланирована!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Подтверждение и ссылка на Google Meet / Zoom отправлены на адрес <span className="text-cyan-300 font-bold">{userEmail}</span>.
                </p>
                <p className="text-xs font-mono text-cyan-400 pt-2">
                  Дата: {selectedDate} в {selectedTime}
                </p>
              </div>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleScheduleSubmit} className="space-y-5">
              
              {selectedAmount && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between">
                  <span>Выбранный билет калькулятора:</span>
                  <span className="font-mono font-bold text-white">${selectedAmount.toLocaleString()} USD</span>
                </div>
              )}

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Выберите удобное время звонка:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeslots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                        selectedTime === slot
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Ваше Имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Александр"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Ваш Email</label>
                  <input
                    type="email"
                    required
                    placeholder="investor@domain.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Подтвердить запись на звонок</span>
              </button>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
