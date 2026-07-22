import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory + JSON file backup for leads
const LEADS_FILE = path.join(process.cwd(), 'leads_data.json');

interface LeadRecord {
  id: string;
  createdAt: string;
  type: string;
  name: string;
  email: string;
  telegram?: string;
  phone?: string;
  company?: string;
  investmentAmount?: number;
  selectedDate?: string;
  selectedTime?: string;
  message?: string;
  status: string;
}

function loadLeadsFromFile(): LeadRecord[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading leads_data.json:', err);
  }
  return [];
}

function saveLeadsToFile(leads: LeadRecord[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving leads_data.json:', err);
  }
}

let serverLeads: LeadRecord[] = loadLeadsFromFile();

// API ROUTES
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET /api/leads
app.get("/api/leads", (req, res) => {
  res.json({
    success: true,
    count: serverLeads.length,
    leads: serverLeads
  });
});

// POST /api/leads
app.post("/api/leads", (req, res) => {
  const newLead: LeadRecord = req.body;
  if (!newLead || !newLead.name || !newLead.email) {
    return res.status(400).json({ success: false, error: "Name and email are required" });
  }

  // Deduplicate by ID if present, otherwise prepend
  const existingIdx = serverLeads.findIndex(l => l.id === newLead.id);
  if (existingIdx >= 0) {
    serverLeads[existingIdx] = newLead;
  } else {
    serverLeads.unshift(newLead);
  }

  saveLeadsToFile(serverLeads);

  console.log(`[NovaBoost Lead System] New lead received from ${newLead.name} (${newLead.email})`);

  res.json({
    success: true,
    message: "Lead received and saved to server database",
    lead: newLead,
    totalLeads: serverLeads.length
  });
});

// DELETE /api/leads/:id
app.delete("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  serverLeads = serverLeads.filter(l => l.id !== id);
  saveLeadsToFile(serverLeads);
  res.json({ success: true, count: serverLeads.length });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
