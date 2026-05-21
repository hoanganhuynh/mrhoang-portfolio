# Academic Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Business/Academic toggle to the Navigation that replaces the entire page with a light-cream academic CV layout (papers, conferences, books, awards) when switched to Academic mode.

**Architecture:** Global `mode` state in `page.tsx` sets `data-mode` attribute on `<html>`, triggering CSS variable overrides for the cream theme. `AnimatePresence` fades between the existing business layout and the new `AcademicPage` component. Navigation receives `mode`/`setMode` props and renders a pill toggle on desktop, icon toggle on mobile.

**Tech Stack:** Next.js 15, React 19, Tailwind v4 (CSS custom property utilities), Framer Motion, lucide-react

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/data/academic.ts` | Typed academic CV data (papers, books, awards) |
| Create | `src/components/AcademicPage.tsx` | Full academic layout with sidebar + tabbed content |
| Modify | `src/app/globals.css` | Add `[data-mode="academic"]` CSS variable overrides |
| Modify | `src/components/Navigation.tsx` | Add `mode`/`setMode` props + toggle UI |
| Modify | `src/app/page.tsx` | Add mode state, `data-mode` effect, AnimatePresence |

---

## Task 1: Academic CSS theme overrides

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add academic color overrides after the existing `@theme` block**

Open `src/app/globals.css`. After the closing `}` of the `@theme` block (line ~58), add:

```css
/* ── Academic light mode ── */

[data-mode="academic"] {
  --color-bg: #F5F0E8;
  --color-surface: rgba(0, 0, 0, 0.04);
  --color-surface-strong: rgba(0, 0, 0, 0.07);
  --color-text-primary: #1A1612;
  --color-text-secondary: rgba(26, 22, 18, 0.60);
  --color-text-muted: rgba(26, 22, 18, 0.40);
  --color-gold: #8B6914;
  --color-gold-soft: rgba(139, 105, 20, 0.12);
  --color-gold-dim: rgba(139, 105, 20, 0.06);
  --color-line: rgba(26, 22, 18, 0.08);
  --color-line-strong: rgba(26, 22, 18, 0.12);
}

[data-mode="academic"] body::before {
  opacity: 0;
}

[data-mode="academic"] body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add academic light mode CSS theme variables"
```

---

## Task 2: Academic data file

**Files:**
- Create: `src/data/academic.ts`

- [ ] **Step 1: Create the typed data file**

Create `src/data/academic.ts` with this exact content:

```ts
export type Paper = {
  title: string;
  authors: string;
  journal: string;
  year: string | number;
};

export type ConferencePaper = {
  title: string;
  authors: string;
  event: string;
  year: string;
};

export type Book = {
  title: string;
  type: string;
  role: string;
  publisher: string;
  year: number;
};

export type Award = {
  rank: string;
  organization: string;
  topic: string;
};

export const internationalPapers: Paper[] = [
  {
    title: "The Role of Mental Health Literacy in Shaping Help-Seeking Behaviors among High School Students in Vietnam",
    authors: "Hoang Le Bao Nguyen, Son Van Huynh, Quan Hong Bui",
    journal: "Saudi Journal of Humanities and Social Sciences",
    year: 2024,
  },
  {
    title: "Factors influencing help-seeking behavior for mental health problems in high school students",
    authors: "Hoang Le Bao Nguyen, Son Van Huynh, Quan Hong Bui",
    journal: "Multidisciplinary Science Journal",
    year: 2024,
  },
];

export const domesticPapers: Paper[] = [
  {
    title: "Hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần ở học sinh trung học phổ thông trong bối cảnh hậu Covid: Một nghiên cứu tổng thuật",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Khoa học Trường Đại học Sư phạm TP. Hồ Chí Minh",
    year: 2024,
  },
  {
    title: "Xây dựng các biện pháp cải thiện hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh trung học",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Khoa học Xã hội, Nhân văn và Giáo dục",
    year: 2025,
  },
  {
    title: "Mối liên hệ giữa mức độ stress, trầm cảm, lo âu và hành vi tìm kiếm sự trợ giúp của học sinh trung học phổ thông",
    authors: "Nguyễn Lê Bảo Hoàng",
    journal: "Tạp chí Thiết bị Giáo dục",
    year: 2024,
  },
  {
    title: "Một số yếu tố ảnh hưởng đến hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh trung học phổ thông",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Giáo dục",
    year: 2024,
  },
  {
    title: "Hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh trung học phổ thông",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Tâm lý học Việt Nam",
    year: 2024,
  },
  {
    title: "Sức khoẻ tâm thần của học sinh trung học phổ thông hậu Covid-19",
    authors: "Nguyễn Lê Bảo Hoàng, Huỳnh Văn Sơn, Bùi Hồng Quân",
    journal: "Tạp chí Nghiên cứu dân tộc",
    year: 2024,
  },
  {
    title: "Getting children ready for school: Familiarization with numerical symbols – An important content in mathematics education",
    authors: "Nguyễn Lê Bảo Hoàng, Giang Thiên Vũ, Mai Mỹ Hạnh, Trần Lương, Đỗ Tất Thiên",
    journal: "Tạp chí Khoa học Trường Đại học Sư phạm TP. Hồ Chí Minh, Tập 18, Số 11",
    year: 2021,
  },
  {
    title: "EEG machine and the neuro-science research in Vietnam",
    authors: "Huỳnh Văn Sơn, Giang Thiên Vũ, Đỗ Tất Thiên, Nguyễn Vĩnh Khương, Nguyễn Lê Bảo Hoàng",
    journal: "Tạp chí Khoa học Trường Đại học Sư phạm TP. Hồ Chí Minh",
    year: 2021,
  },
];

export const internationalConferences: ConferencePaper[] = [
  {
    title: "Factors affecting the development of school counselors in the Southern region of Vietnam – The management perspective",
    authors: "Van Son Huynh, Thien Vu Giang, Bao Hoang Nguyen Le, Thien Vu Nguyen An",
    event: "International Conference on Educational Innovation (Taiwan)",
    year: "11/2019",
  },
];

export const domesticConferences: ConferencePaper[] = [
  {
    title: "Nghiên cứu về hành vi tự cô lập – Hướng nghiên cứu cần quan tâm ở học đường",
    authors: "Nguyễn Lê Bảo Hoàng, Giang Thiên Vũ, Đỗ Tất Thiên",
    event: "Hội thảo khoa học quốc tế Tâm lý học học đường lần thứ 6 – Vai trò của Tâm lí học trường học trong việc đảm bảo sức khỏe tâm lí cho học sinh và gia đình",
    year: "2018",
  },
  {
    title: "Khởi nghiệp từ đề tài phòng tránh xâm hại tình dục trẻ em của sinh viên ngành tâm lý học",
    authors: "Giang Thiên Vũ, Nguyễn Lê Bảo Hoàng, Nguyễn Thanh Huân",
    event: "Hội thảo khởi nghiệp của sinh viên ngoài sư phạm",
    year: "2018",
  },
  {
    title: "Mô hình tham vấn học đường trường THCS và THPT Việt Anh",
    authors: "Mai Mỹ Hạnh, Giang Thiên Vũ, Nguyễn Lê Bảo Hoàng",
    event: "Hội thảo khoa học Phát triển mô hình tham vấn học đường ở trường phổ thông",
    year: "2017",
  },
];

export const books: Book[] = [
  {
    title: "Câu chuyện Đạo đức (Lớp 1)",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2022,
  },
  {
    title: "Thực hành Kỹ năng sống (Lớp 11)",
    type: "Sách giáo khoa",
    role: "Tác giả (viết chung)",
    publisher: "NXB Giáo dục Việt Nam",
    year: 2021,
  },
  {
    title: "Văn hoá Học đường (Lớp 4)",
    type: "Sách giáo khoa",
    role: "Tác giả (viết chung)",
    publisher: "NXB Giáo dục Việt Nam",
    year: 2021,
  },
  {
    title: "Sáng Tạo Với Màu Nước Và Giấy – Thực Hành Sáng Tạo Với Màu Nước (Tập 1 & 2)",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2017,
  },
  {
    title: "Kỹ Năng Phòng Tránh Xâm Hại Cho Trẻ Mầm Non",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2017,
  },
  {
    title: "Kỹ Năng Phòng Tránh Xâm Hại Cho Học Sinh Tiểu Học",
    type: "Sách tham khảo",
    role: "Tác giả (viết chung)",
    publisher: "NXB Đại học Sư phạm TP.HCM",
    year: 2017,
  },
];

export const awards: Award[] = [
  {
    rank: "Giải Ba",
    organization: "Hội thi sáng tạo kỹ thuật TP. Hồ Chí Minh năm 2015–2016",
    topic: "Thử nghiệm một số biện pháp nâng đỡ cảm xúc cho trẻ bị lạm dụng tình dục",
  },
  {
    rank: "Giải Ba",
    organization: "Giải thưởng Sinh viên Nghiên cứu Khoa học Eureka lần thứ 18 (2016)",
    topic: "Thử nghiệm một số biện pháp nâng đỡ cảm xúc cho trẻ bị lạm dụng tình dục",
  },
  {
    rank: "Giải Khuyến khích",
    organization: "Sinh viên Nghiên cứu khoa học 2016–2017, Trường Đại học Sư phạm TP.HCM",
    topic: "Vận dụng \"Năm điều Bác Hồ dạy\" vào xây dựng sách ảnh giáo dục đạo đức cho học sinh tiểu học",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/academic.ts
git commit -m "feat: add academic CV data (papers, books, awards)"
```

---

## Task 3: AcademicPage component

**Files:**
- Create: `src/components/AcademicPage.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/AcademicPage.tsx`:

```tsx
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

function PaperEntry({ paper, index }: { paper: Paper; index: number }) {
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
        <span className="text-line">·</span>
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
      {internationalPapers.map((p, i) => <PaperEntry key={i} paper={p} index={i} />)}
      <SubGroupLabel>Bài báo trong nước · {domesticPapers.length}</SubGroupLabel>
      {domesticPapers.map((p, i) => <PaperEntry key={i} paper={p} index={i} />)}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AcademicPage.tsx
git commit -m "feat: add AcademicPage component with tabbed CV layout"
```

---

## Task 4: Update Navigation with mode toggle

**Files:**
- Modify: `src/components/Navigation.tsx`

- [ ] **Step 1: Replace the entire file content**

Open `src/components/Navigation.tsx` and replace with:

```tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, GraduationCap, Briefcase } from "lucide-react";

type Mode = "business" | "academic";

const navItems = [
  { label: "Profile", href: "#about" },
  { label: "Method", href: "#method" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface NavigationProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function Navigation({ mode, setMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = navItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    window.dispatchEvent(
      new CustomEvent("lazy-section-request", { detail: href.slice(1) })
    );
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const toggleMode = () => setMode(mode === "business" ? "academic" : "business");

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 anim-fade-up ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-[1360px] px-6 md:px-10 lg:px-14">
          <div className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
            isScrolled
              ? "border-line bg-bg/78 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-[28px]"
              : "border-transparent bg-transparent shadow-none backdrop-blur-0"
          }`}>

            {/* Logo */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                if (mode === "academic") {
                  setMode("business");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="relative z-10 flex items-center"
            >
              <Image
                src="/assets/logo.svg"
                alt="Williens logo"
                width={124}
                height={34}
                priority
                className="h-8 w-auto"
              />
            </a>

            {/* Desktop nav items — only in business mode */}
            {mode === "business" && (
              <div className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5 transition-all duration-500">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`relative px-4 py-1.5 rounded-full font-mono text-[16px] tracking-[0.02em] uppercase transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? "text-gold"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Academic mode center label */}
            {mode === "academic" && (
              <span className="hidden md:block font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted">
                Lý lịch khoa học
              </span>
            )}

            {/* Desktop right side: mode toggle + call button */}
            <div className="hidden md:flex items-center gap-3">
              {/* Pill toggle */}
              <div className="flex items-center rounded-full border border-line bg-surface overflow-hidden">
                <button
                  onClick={() => setMode("business")}
                  className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-300 rounded-full ${
                    mode === "business"
                      ? "bg-gold/15 text-gold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => setMode("academic")}
                  className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-300 rounded-full ${
                    mode === "academic"
                      ? "bg-gold/15 text-gold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Academic
                </button>
              </div>

              <button
                onClick={() => { window.location.href = "tel:0929822369"; }}
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase px-5 py-2 rounded-full border border-gold/25 bg-gold/10 text-gold hover:bg-gold hover:text-bg transition-all duration-300 z-10"
              >
                <Phone size={13} />
                Call 0929 822 369
              </button>
            </div>

            {/* Mobile right side: mode icon + menu */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="tel:0929822369"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase px-3 py-2 rounded-full border border-gold/25 bg-gold/10 text-gold"
                aria-label="Call 0929 822 369"
              >
                <Phone size={12} />
                0929 822 369
              </a>
              {/* Mode toggle icon */}
              <button
                onClick={toggleMode}
                className="p-2 text-text-muted hover:text-gold transition-colors z-10"
                aria-label={mode === "business" ? "Switch to Academic mode" : "Switch to Business mode"}
              >
                {mode === "business" ? <GraduationCap size={18} /> : <Briefcase size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-text-muted hover:text-text-primary transition-colors z-10"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-3xl pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-1 pt-8">
              {mode === "business" && navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left font-heading text-2xl font-bold text-text-primary hover:text-gold transition-colors py-4 border-b border-line flex items-center justify-between"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-text-muted tracking-wider">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
              {mode === "academic" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[12px] text-text-muted uppercase tracking-wider py-4"
                >
                  Lý lịch khoa học
                </motion.p>
              )}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => scrollTo("#contact")}
                className="mt-8 w-full py-3.5 font-mono text-[11px] tracking-wider uppercase border border-gold/20 text-gold rounded-full hover:bg-gold/[0.05] transition-all"
              >
                Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: add Business/Academic mode toggle to Navigation"
```

---

## Task 5: Wire mode state in page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the entire file content**

Open `src/app/page.tsx` and replace with:

```tsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Quote from "@/components/Quote";
import LazyMount from "@/components/LazyMount";
import Footer from "@/components/Footer";
import AcademicPage from "@/components/AcademicPage";

const About = dynamic(() => import("@/components/About"));
const StrategicIdentity = dynamic(() => import("@/components/StrategicIdentity"));
const Experience = dynamic(() => import("@/components/Experience"));
const ProjectManagement = dynamic(() => import("@/components/ProjectManagement"));
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const Capabilities = dynamic(() => import("@/components/Capabilities"));
const Partners = dynamic(() => import("@/components/Partners"));

type Mode = "business" | "academic";

export default function Home() {
  const [mode, setMode] = useState<Mode>("business");

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    if (mode === "academic") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [mode]);

  return (
    <>
      <Navigation mode={mode} setMode={setMode} />
      <AnimatePresence mode="wait">
        {mode === "business" ? (
          <motion.div
            key="business"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <main id="main-content">
              <Hero />
              <Quote />
              <LazyMount id="about"><About /></LazyMount>
              <LazyMount><StrategicIdentity /></LazyMount>
              <LazyMount id="experience"><Experience /></LazyMount>
              <LazyMount id="method"><ProjectManagement /></LazyMount>
              <LazyMount id="projects" minHeight="760px"><FeaturedProjects /></LazyMount>
              <LazyMount><Capabilities /></LazyMount>
              <LazyMount minHeight="360px"><Partners /></LazyMount>
            </main>
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="academic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AcademicPage />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire Business/Academic mode toggle with animated page switch"
```

---

## Self-Review Checklist

- [x] CSS variables override via `[data-mode="academic"]` — covered in Task 1
- [x] `body::before` grid overlay hidden in academic mode — covered in Task 1
- [x] All 4 tabs (papers, conferences, books, awards) — covered in Tasks 2 & 3
- [x] Default active tab = Bài báo — `useState<TabId>("papers")` in AcademicPage
- [x] Desktop pill toggle left of call button — covered in Task 4
- [x] Mobile icon toggle (GraduationCap/Briefcase) next to menu icon — covered in Task 4
- [x] Avatar from `/assets/avatar-3.png` in sidebar — covered in Task 3
- [x] AnimatePresence fade on mode switch — covered in Task 5
- [x] Scroll-to-top on academic mode enter — `window.scrollTo` in useEffect, Task 5
- [x] Navigation always visible in both modes — Navigation outside AnimatePresence in Task 5
- [x] Sub-groups within Bài báo tab (quốc tế / trong nước) — SubGroupLabel in Task 3
- [x] Sub-groups within Hội thảo tab — covered in Task 3
- [x] Mobile: horizontal scrollable tabs — covered in Task 3
- [x] Type consistency: `Mode = "business" | "academic"` used in Navigation props and page.tsx
- [x] `TabId` type consistent across TABS array and useState in AcademicPage
