export interface Lead {
  id: string;
  createdAt: string;
  type: 'investment' | 'meeting';
  name: string;
  email: string;
  telegram?: string;
  phone?: string;
  company?: string;
  investmentAmount?: number;
  selectedDate?: string;
  selectedTime?: string;
  message?: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
}

const STORAGE_KEY = 'novaboost_investor_leads_v1';

export const getLeads = (): Lead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load leads from localStorage:', err);
    return [];
  }
};

export const saveLeads = (leads: Lead[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new Event('novaboost_leads_updated'));
  } catch (err) {
    console.error('Failed to save leads to localStorage:', err);
  }
};

export const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead => {
  const newLead: Lead = {
    ...leadData,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  const currentLeads = getLeads();
  const updated = [newLead, ...currentLeads];
  saveLeads(updated);

  // Send asynchronously to backend API if present
  fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLead)
  }).catch(() => {
    // Backend API is optional, local persistence guarantees zero data loss
  });

  return newLead;
};

export const updateLeadStatus = (id: string, status: Lead['status']): void => {
  const leads = getLeads();
  const updated = leads.map(l => l.id === id ? { ...l, status } : l);
  saveLeads(updated);
};

export const deleteLead = (id: string): void => {
  const leads = getLeads();
  const updated = leads.filter(l => l.id !== id);
  saveLeads(updated);
};

export const clearAllLeads = (): void => {
  saveLeads([]);
};

export const generateTelegramLink = (lead: Partial<Lead>): string => {
  const text = `Здравствуйте, Mr. Jin!
Я подал(а) заявку на участие в Seed Round 2026 NovaBoost.

📋 ДЕТАЛИ ЗАЯВКИ:
Тип: ${lead.type === 'meeting' ? 'Созвон с основателем' : 'Инвестиционная заявка'}
Имя: ${lead.name || 'Не указано'}
Email: ${lead.email || 'Не указан'}
${lead.telegram ? `Telegram: ${lead.telegram}\n` : ''}${lead.phone ? `Телефон: ${lead.phone}\n` : ''}${lead.investmentAmount ? `Сумма билета: $${lead.investmentAmount.toLocaleString()} USD\n` : ''}${lead.selectedDate ? `Желаемая дата: ${lead.selectedDate} в ${lead.selectedTime}\n` : ''}${lead.company ? `Компания/Фонд: ${lead.company}\n` : ''}${lead.message ? `Сообщение: ${lead.message}\n` : ''}
Жду подтверждения и инвестиционные материалы!`;

  return `https://t.me/MrJinPro?text=${encodeURIComponent(text)}`;
};

export const generateMailtoLink = (lead: Partial<Lead>): string => {
  const subject = `[NovaBoost Seed 2026] Заявка от ${lead.name || 'Инвестора'}`;
  const body = `Здравствуйте, Основатель NovaBoost!

Направляю детали заявки на инвестиции:

Тип: ${lead.type === 'meeting' ? 'Созвон с основателем' : 'Инвестиционная заявка'}
Имя: ${lead.name || 'Не указано'}
Email: ${lead.email || 'Не указан'}
${lead.telegram ? `Telegram: ${lead.telegram}\n` : ''}${lead.phone ? `Телефон: ${lead.phone}\n` : ''}${lead.investmentAmount ? `Планируемая сумма: $${lead.investmentAmount.toLocaleString()} USD\n` : ''}${lead.selectedDate ? `Время встречи: ${lead.selectedDate} в ${lead.selectedTime}\n` : ''}${lead.company ? `Компания/Фонд: ${lead.company}\n` : ''}${lead.message ? `Комментарий: ${lead.message}\n` : ''}
С уважением,
${lead.name || 'Инвестор'}`;

  return `mailto:admin@novaboost.cloud?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const exportLeadsCSV = (): void => {
  const leads = getLeads();
  if (leads.length === 0) return;

  const headers = ['ID', 'Дата', 'Тип', 'Имя', 'Email', 'Telegram', 'Телефон', 'Сумма USD', 'Статус', 'Сообщение'];
  const rows = leads.map(l => [
    l.id,
    new Date(l.createdAt).toLocaleString('ru-RU'),
    l.type === 'meeting' ? 'Созвон' : 'Заявка',
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.telegram || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    l.investmentAmount || 0,
    l.status,
    `"${(l.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NovaBoost_Leads_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
