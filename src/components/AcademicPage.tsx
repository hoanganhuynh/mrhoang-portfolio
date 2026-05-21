"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  internationalPapers,
  domesticPapers,
  internationalConferences,
  domesticConferences,
  books,
  awards,
  type Paper,
  type ConferencePaper,
  type Book,
  type Award,
} from "@/data/academic";

type TabId = "papers" | "conferences" | "books" | "awards";

const TABS: { id: TabId; label: string; count: number }[] = [
  { id: "papers", label: "Bài báo", count: internationalPapers.length + domesticPapers.length },
  { id: "conferences", label: "Hội thảo", count: internationalConferences.length + domesticConferences.length },
  { id: "books", label: "Sách", count: books.length },
  { id: "awards", label: "Giải thưởng", count: awards.length },
];

function SubGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-muted shrink-0">
        {children}
      </span>
      <div className="hairline flex-1" />
    </div>
  );
}

function PaperEntry({ paper }: { paper: Paper }) {
  return (
    <div className="py-4 border-b border-line last:border-0">
      <p className="font-body text-[14px] text-text-primary leading-snug font-medium mb-1">
        {paper.title}
      </p>
      <p className="font-mono text-[11px] text-text-muted mb-1">{paper.authors}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[11px] text-text-secondary italic">{paper.journal}</span>
        <span className="font-mono text-[10px] text-gold px-2 py-0.5 rounded-full border border-gold/20 bg-gold-dim">
          {paper.year}
        </span>
      </div>
    </div>
  );
}

function ConferenceEntry({ paper }: { paper: ConferencePaper }) {
  return (
    <div className="py-4 border-b border-line last:border-0">
      <p className="font-body text-[14px] text-text-primary leading-snug font-medium mb-1">
        {paper.title}
      </p>
      <p className="font-mono text-[11px] text-text-muted mb-1">{paper.authors}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[11px] text-text-secondary italic">{paper.event}</span>
        <span className="font-mono text-[10px] text-gold px-2 py-0.5 rounded-full border border-gold/20 bg-gold-dim">
          {paper.year}
        </span>
      </div>
    </div>
  );
}

function BookEntry({ book }: { book: Book }) {
  return (
    <div className="py-4 border-b border-line last:border-0">
      <p className="font-body text-[14px] text-text-primary leading-snug font-medium mb-1">
        {book.title}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[11px] text-text-muted">{book.type}</span>
        <span className="text-text-muted">·</span>
        <span className="font-mono text-[11px] text-text-secondary italic">{book.publisher}</span>
        <span className="font-mono text-[10px] text-gold px-2 py-0.5 rounded-full border border-gold/20 bg-gold-dim">
          {book.year}
        </span>
      </div>
    </div>
  );
}

function AwardEntry({ award }: { award: Award }) {
  return (
    <div className="py-4 border-b border-line last:border-0">
      <div className="flex items-start gap-3">
        <span className="font-mono text-[11px] text-gold font-bold px-2.5 py-1 rounded-full border border-gold/25 bg-gold-dim shrink-0 mt-0.5">
          {award.rank}
        </span>
        <div>
          <p className="font-mono text-[11px] text-text-secondary mb-1">{award.organization}</p>
          <p className="font-body text-[13px] text-text-muted italic">Đề tài: {award.topic}</p>
        </div>
      </div>
    </div>
  );
}

function PapersTab() {
  return (
    <div>
      <SubGroupLabel>Bài báo quốc tế · {internationalPapers.length}</SubGroupLabel>
      {internationalPapers.map((p, i) => <PaperEntry key={i} paper={p} />)}
      <SubGroupLabel>Bài báo trong nước · {domesticPapers.length}</SubGroupLabel>
      {domesticPapers.map((p, i) => <PaperEntry key={i} paper={p} />)}
    </div>
  );
}

function ConferencesTab() {
  return (
    <div>
      <SubGroupLabel>Hội thảo quốc tế · {internationalConferences.length}</SubGroupLabel>
      {internationalConferences.map((p, i) => <ConferenceEntry key={i} paper={p} />)}
      <SubGroupLabel>Hội thảo trong nước · {domesticConferences.length}</SubGroupLabel>
      {domesticConferences.map((p, i) => <ConferenceEntry key={i} paper={p} />)}
    </div>
  );
}

function BooksTab() {
  return (
    <div>
      {books.map((b, i) => <BookEntry key={i} book={b} />)}
    </div>
  );
}

function AwardsTab() {
  return (
    <div>
      {awards.map((a, i) => <AwardEntry key={i} award={a} />)}
    </div>
  );
}

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState<TabId>("papers");

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-56 shrink-0">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3 mb-6">
              <Image
                src="/assets/avatar-3.png"
                alt="Nguyễn Lê Bảo Hoàng"
                width={80}
                height={80}
                className="rounded-full object-cover w-16 h-16 md:w-20 md:h-20 shrink-0"
              />
              <div>
                <h1 className="font-heading font-bold text-[17px] leading-snug text-text-primary">
                  Nguyễn Lê Bảo Hoàng
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted mt-1">
                  Tiến sĩ Tâm lý học
                </p>
                <p className="font-mono text-[10px] text-text-muted mt-0.5">
                  ĐH Sư phạm TP.HCM · 2025
                </p>
              </div>
            </div>

            {/* Desktop vertical tabs */}
            <div className="hidden md:block">
              <div className="hairline mb-5" />
              <nav className="flex flex-col gap-0.5">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-3 py-2.5 rounded-lg font-mono text-[12px] tracking-wide transition-all duration-200 flex items-center justify-between border-l-2 ${
                      activeTab === tab.id
                        ? "border-gold text-text-primary font-semibold bg-surface-strong"
                        : "border-transparent text-text-muted hover:text-text-primary hover:bg-surface"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] text-text-muted tabular-nums">{tab.count}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile horizontal tab scroll */}
            <div className="flex md:hidden overflow-x-auto gap-2 pb-1 -mx-1 px-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 px-4 py-1.5 rounded-full font-mono text-[11px] tracking-wide transition-all duration-200 border ${
                    activeTab === tab.id
                      ? "border-gold/30 bg-gold-soft text-gold"
                      : "border-line bg-surface text-text-muted"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 opacity-60">{tab.count}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            <div className="mb-6 pb-4 border-b border-line-strong flex items-baseline gap-2">
              <h2 className="font-heading font-bold text-[22px] text-text-primary">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h2>
              <span className="font-mono text-[12px] text-text-muted">
                · {TABS.find((t) => t.id === activeTab)?.count} mục
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTab === "papers" && <PapersTab />}
                {activeTab === "conferences" && <ConferencesTab />}
                {activeTab === "books" && <BooksTab />}
                {activeTab === "awards" && <AwardsTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
