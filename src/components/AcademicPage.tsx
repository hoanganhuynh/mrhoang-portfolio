"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  FileText,
  Mic,
  MessageSquare,
  BookOpen,
  Trophy,
  Award as AwardIcon,
  Star,
  Users,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
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

// ── Types ──────────────────────────────────────────────────────────────

type TabId =
  | "intl-papers"
  | "domestic-papers"
  | "intl-conferences"
  | "domestic-conferences"
  | "books"
  | "awards";

const TABS: { id: TabId; label: string; count: number; Icon: React.ElementType }[] = [
  { id: "domestic-papers",       label: "Bài báo trong nước",    count: domesticPapers.length,           Icon: FileText      },
  { id: "intl-papers",           label: "Bài báo quốc tế",      count: internationalPapers.length,      Icon: Globe         },
  { id: "intl-conferences",      label: "Hội thảo quốc tế",      count: internationalConferences.length, Icon: Mic           },
  { id: "domestic-conferences",  label: "Hội thảo trong nước",   count: domesticConferences.length,      Icon: MessageSquare },
  { id: "books",                 label: "Sách",                  count: books.length,                    Icon: BookOpen      },
  { id: "awards",                label: "Giải thưởng",           count: awards.length,                   Icon: Trophy        },
];

const PROFILE = {
  name:      "Nguyễn Lê Bảo Hoàng",
  dob:       "24/10/1993",
  hometown:  "ĐăkLăk",
  title:     "PhD. Psychology",
  titleYear: "Lecturer in Psychology in Business Administration",
  address:   "Tecco Central Home 06-08 Nguyễn Thiện Thuật, P.24, Q. Bình Thạnh",
  phone:     "0929822369",
  email:     "nguyenlebaohoang@gmail.com",
};

const AWARD_ICONS = [Trophy, AwardIcon, Star] as const;

// ── Timeline utility ───────────────────────────────────────────────────

type YearGroup<T> = { year: string; entries: { data: T; stt: number }[] };

function groupAndIndex<T extends { year: string | number }>(items: T[]): YearGroup<T>[] {
  const map = new Map<string, T[]>();
  items.forEach((item) => {
    const y = String(item.year).match(/(\d{4})/)?.[1] ?? String(item.year);
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(item);
  });
  let counter = 0;
  return Array.from(map.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, group]) => ({
      year,
      entries: group.map((data) => ({ data, stt: ++counter })),
    }));
}

// ── TimelineYear wrapper ───────────────────────────────────────────────

function TimelineYear({
  year,
  isLast,
  hideDot = false,
  children,
}: {
  year: string;
  isLast: boolean;
  hideDot?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {!hideDot && (
        <div className="flex flex-col items-center mr-4 pt-1 shrink-0" style={{ width: 28 }}>
          <div className="w-2.5 h-2.5 rounded-full bg-gold ring-2 ring-gold/20 shrink-0" />
          {!isLast && <div className="w-px bg-line flex-1 mt-2" />}
        </div>
      )}
      <div className={`flex-1 ${isLast ? "pb-2" : "pb-10"}`}>
        <p className="font-mono text-[11px] md:text-[14px] font-bold text-gold -mt-0.5 mb-4">{year}</p>
        {children}
      </div>
    </div>
  );
}

// ── Entry components ───────────────────────────────────────────────────

function PaperEntry({ paper }: { paper: Paper }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="font-body text-[14px] text-text-primary leading-snug font-semibold mb-2">
        {paper.title}
      </p>
      <div className="flex items-center gap-1.5 mb-1">
        <Users size={13} className="text-text-muted shrink-0" />
        <p className="font-body text-[12px] md:text-[14px] text-text-muted leading-relaxed">{paper.authors}</p>
      </div>
      <p className="font-body text-[12px] md:text-[14px] text-text-secondary italic pl-[21px]">{paper.journal}</p>
    </div>
  );
}

function ConferenceEntry({ paper }: { paper: ConferencePaper }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="font-body text-[14px] text-text-primary leading-snug font-semibold mb-2">
        {paper.title}
      </p>
      <div className="flex items-center gap-1.5 mb-1">
        <Users size={13} className="text-text-muted shrink-0" />
        <p className="font-body text-[12px] md:text-[14px] text-text-muted leading-relaxed">{paper.authors}</p>
      </div>
      <p className="font-body text-[12px] md:text-[14px] text-text-secondary italic pl-[21px]">{paper.event}</p>
    </div>
  );
}

function BookEntry({ book }: { book: Book }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="font-body text-[14px] text-text-primary leading-snug font-semibold mb-1.5">
        {book.title}
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-body text-[12px] md:text-[14px] text-text-muted">{book.type}</span>
        <span className="text-text-muted opacity-40">·</span>
        <span className="font-body text-[12px] md:text-[14px] text-text-secondary italic">{book.publisher}</span>
      </div>
    </div>
  );
}

// ── Tab content ────────────────────────────────────────────────────────

function PaperTimelineTab({ items, hideDot = false }: { items: Paper[]; hideDot?: boolean }) {
  const groups = groupAndIndex(items);
  return (
    <div>
      {groups.map(({ year, entries }, gi) => (
        <TimelineYear key={year} year={year} isLast={gi === groups.length - 1} hideDot={hideDot}>
          {entries.map(({ data, stt }) => (
            <PaperEntry key={stt} paper={data} />
          ))}
        </TimelineYear>
      ))}
    </div>
  );
}

function ConferenceTimelineTab({ items, hideDot = false }: { items: ConferencePaper[]; hideDot?: boolean }) {
  const groups = groupAndIndex(items);
  return (
    <div>
      {groups.map(({ year, entries }, gi) => (
        <TimelineYear key={year} year={year} isLast={gi === groups.length - 1} hideDot={hideDot}>
          {entries.map(({ data, stt }) => (
            <ConferenceEntry key={stt} paper={data} />
          ))}
        </TimelineYear>
      ))}
    </div>
  );
}

function BooksTimelineTab() {
  const groups = groupAndIndex(books);
  return (
    <div>
      {groups.map(({ year, entries }, gi) => (
        <TimelineYear key={year} year={year} isLast={gi === groups.length - 1}>
          {entries.map(({ data, stt }) => (
            <BookEntry key={stt} book={data} />
          ))}
        </TimelineYear>
      ))}
    </div>
  );
}

function AwardsTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {awards.map((award: Award, i: number) => {
        const Icon = AWARD_ICONS[i % AWARD_ICONS.length];
        return (
          <div
            key={i}
            className="rounded-2xl border border-line bg-surface p-5 flex flex-col gap-3 hover:border-gold/30 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-soft flex items-center justify-center shrink-0">
              <Icon size={18} className="text-gold" />
            </div>
            {/* rank badge */}
            <span className="font-mono text-[10px] md:text-[14px] text-gold font-bold px-2.5 py-1 rounded-full border border-gold/25 bg-gold-dim self-start tracking-wide uppercase">
              {award.rank}
            </span>
            <p className="font-body text-[12px] md:text-[14px] text-text-secondary leading-snug">
              {award.organization}
            </p>
            <p className="font-body text-[12px] md:text-[14px] text-text-muted italic leading-snug">
              {award.topic}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState<TabId>("intl-papers");
  const activeTabMeta = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen pt-24 md:pt-[136px] pb-20">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-80 shrink-0">

            {/* Desktop: full-width square avatar — new academic photo */}
            <div className="hidden md:block mb-4">
              <Image
                src="/assets/mr-hoang-academic.jpeg"
                alt="Nguyễn Lê Bảo Hoàng"
                width={320}
                height={320}
                className="w-full aspect-square object-cover object-top rounded-2xl"
              />
            </div>

            {/* Mobile: compact header row */}
            <div className="flex md:hidden items-center gap-4 mb-4">
              <div className="flex-1">
                <h1 className="font-heading font-bold text-[20px] text-text-primary leading-tight">
                  {PROFILE.name}
                </h1>
                <p className="font-mono text-[11px] tracking-[0.02em] text-gold mt-1">
                  {PROFILE.title}
                </p>
                <p className="font-body text-[12px] text-text-secondary mt-1 leading-snug">
                  Giảng viên tại Đại học Sư phạm TP. Hồ Chí Minh<br />
                  Tâm lý học Quản trị kinh doanh
                </p>
              </div>
              <Image
                src="/assets/mr-hoang-academic.jpeg"
                alt="Nguyễn Lê Bảo Hoàng"
                width={120}
                height={120}
                className="w-[120px] h-[120px] object-cover object-top rounded-2xl shrink-0"
              />
            </div>
            <div className="flex md:hidden flex-col gap-2 mb-5">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-text-muted shrink-0" />
                <span className="font-body text-[13px] text-text-secondary">{PROFILE.hometown}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-text-muted shrink-0" />
                <a href={`tel:${PROFILE.phone}`} className="font-body text-[13px] text-text-secondary hover:text-gold transition-colors">
                  {PROFILE.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-text-muted shrink-0" />
                <a href={`mailto:${PROFILE.email}`} className="font-body text-[13px] text-text-secondary hover:text-gold transition-colors break-all">
                  {PROFILE.email}
                </a>
              </div>
            </div>

            {/* Desktop: name + profile info */}
            <div className="hidden md:block mb-5">
              <h1 className="font-heading font-bold text-[22px] leading-tight text-text-primary mb-0.5">
                {PROFILE.name}
              </h1>
              {/* subtitle: desktop minimum 14px */}
              <p className="font-mono text-[14px] tracking-[0.02em] text-gold mb-1">
                {PROFILE.title} – {PROFILE.titleYear}
              </p>
              <p className="font-body text-[13px] text-text-secondary mb-4 leading-snug">
                Giảng viên tại Đại học Sư phạm TP. Hồ Chí Minh<br />
                Tâm lý học Quản trị kinh doanh
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-text-muted shrink-0" />
                  <span className="font-body text-[14px] text-text-secondary">{PROFILE.hometown}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-text-muted shrink-0" />
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="font-body text-[14px] text-text-secondary hover:text-gold transition-colors"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-text-muted shrink-0" />
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-body text-[14px] text-text-secondary hover:text-gold transition-colors break-all"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop: vertical tab nav */}
            <div className="hidden md:block">
              <div className="hairline mb-4" />
              <nav className="flex flex-col gap-0.5">
                {TABS.map((tab) => {
                  const Icon = tab.Icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-left px-3 py-2.5 rounded-lg text-[14px] transition-all duration-200 flex items-center gap-2.5 border-l-2 ${
                        activeTab === tab.id
                          ? "border-gold text-text-primary font-semibold bg-surface-strong"
                          : "border-transparent text-text-muted hover:text-text-primary hover:bg-surface"
                      }`}
                    >
                      <Icon size={14} className="shrink-0" />
                      <span className="flex-1 font-body">{tab.label}</span>
                      <span className="font-mono text-[14px] text-text-muted tabular-nums">{tab.count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile: horizontal tab scroll */}
            <div className="flex md:hidden overflow-x-auto gap-2 pb-1 -mx-1 px-1">
              {TABS.map((tab) => {
                const Icon = tab.Icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-body text-[13px] transition-all duration-200 border ${
                      activeTab === tab.id
                        ? "border-gold/30 bg-gold-soft text-gold"
                        : "border-line bg-surface text-text-muted"
                    }`}
                  >
                    <Icon size={13} className="shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            {/* Mobile: sticky with blur */}
            <div className="md:hidden sticky top-[60px] z-20 mb-7 pb-4 border-b border-line-strong flex items-baseline gap-2 bg-bg/80 backdrop-blur-[20px] -mx-6 px-6">
              <h2 className="font-heading font-bold text-[22px] text-text-primary">
                {activeTabMeta.label}
              </h2>
              <span className="font-mono text-[12px] text-text-muted">
                · {activeTabMeta.count} mục
              </span>
            </div>
            {/* Desktop: static, no blur */}
            <div className="hidden md:flex mb-8 items-baseline gap-2">
              <h2 className="font-heading font-bold text-[22px] text-text-primary">
                {activeTabMeta.label}
              </h2>
              <span className="font-mono text-[14px] text-text-muted">
                · {activeTabMeta.count} mục
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
                {activeTab === "intl-papers"          && <PaperTimelineTab items={internationalPapers} hideDot={true} />}
                {activeTab === "domestic-papers"      && <PaperTimelineTab items={domesticPapers} />}
                {activeTab === "intl-conferences"     && <ConferenceTimelineTab items={internationalConferences} hideDot={true} />}
                {activeTab === "domestic-conferences" && <ConferenceTimelineTab items={domesticConferences} />}
                {activeTab === "books"                && <BooksTimelineTab />}
                {activeTab === "awards"               && <AwardsTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
