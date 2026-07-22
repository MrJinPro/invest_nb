/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EcosystemSection } from './components/EcosystemSection';
import { MarketProblemSection } from './components/MarketProblemSection';
import { WhyNovaBoostSection } from './components/WhyNovaBoostSection';
import { BusinessModelSection } from './components/BusinessModelSection';
import { FinancialsSection } from './components/FinancialsSection';
import { CalculatorSection } from './components/CalculatorSection';
import { RoadmapSection } from './components/RoadmapSection';
import { StatusChecklistSection } from './components/StatusChecklistSection';
import { InvestmentProposalSection } from './components/InvestmentProposalSection';
import { DocumentsSection } from './components/DocumentsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MemorandumModal } from './components/MemorandumModal';
import { ScheduleMeetingModal } from './components/ScheduleMeetingModal';
import { LeadsAdminModal } from './components/LeadsAdminModal';
import { DocumentItem } from './data/novaboost-data';

export default function App() {
  const [isMemorandumOpen, setIsMemorandumOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isLeadsOpen, setIsLeadsOpen] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [selectedCalcAmount, setSelectedCalcAmount] = useState<number | undefined>(undefined);

  const handleOpenMemorandum = (doc?: DocumentItem) => {
    if (doc) {
      setSelectedDocument(doc);
    } else {
      setSelectedDocument(null);
    }
    setIsMemorandumOpen(true);
  };

  const handleOpenSchedule = (amount?: number) => {
    if (amount) {
      setSelectedCalcAmount(amount);
    }
    setIsScheduleOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-[#f1f5f9] overflow-x-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Fixed Header Bar */}
      <Navbar 
        onOpenMemorandum={() => handleOpenMemorandum()} 
        onOpenSchedule={() => handleOpenSchedule()} 
        onOpenLeadsModal={() => setIsLeadsOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Screen */}
        <HeroSection 
          onOpenMemorandum={() => handleOpenMemorandum()} 
          onOpenSchedule={() => handleOpenSchedule()} 
        />

        {/* 2. Ecosystem Screen & Interactive Scheme */}
        <EcosystemSection />

        {/* 3. Market Problem & Solution */}
        <MarketProblemSection />

        {/* 4. Why NovaBoost */}
        <WhyNovaBoostSection />

        {/* 5. Business Model */}
        <BusinessModelSection />

        {/* 6. Financial Structure & Use of Funds */}
        <FinancialsSection />

        {/* 7. Investment Proposal Highlight */}
        <InvestmentProposalSection 
          onOpenMemorandum={() => handleOpenMemorandum()} 
          onOpenSchedule={() => handleOpenSchedule()} 
        />

        {/* 8. Online Investor Calculator */}
        <CalculatorSection 
          onScheduleWithAmount={(amount) => handleOpenSchedule(amount)} 
        />

        {/* 9. Roadmap */}
        <RoadmapSection />

        {/* 10. Status Readiness Checklist */}
        <StatusChecklistSection />

        {/* 11. Documents */}
        <DocumentsSection 
          onSelectDocument={(doc) => handleOpenMemorandum(doc)} 
        />

        {/* 12. FAQ */}
        <FAQSection />

        {/* 13. Contacts & Founder Feedback Form */}
        <ContactSection 
          onOpenSchedule={() => handleOpenSchedule()} 
          onOpenLeadsModal={() => setIsLeadsOpen(true)}
          initialInvestmentAmount={selectedCalcAmount}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <MemorandumModal 
        isOpen={isMemorandumOpen} 
        onClose={() => setIsMemorandumOpen(false)} 
        document={selectedDocument}
      />

      <ScheduleMeetingModal 
        isOpen={isScheduleOpen} 
        onClose={() => setIsScheduleOpen(false)} 
        selectedAmount={selectedCalcAmount}
      />

      <LeadsAdminModal
        isOpen={isLeadsOpen}
        onClose={() => setIsLeadsOpen(false)}
      />

    </div>
  );
}

