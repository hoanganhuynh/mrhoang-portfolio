# Academic Mode — Design Spec
**Date:** 2026-05-21
**Status:** Approved

---

## Tổng quan

Thêm toggle Business/Academic trên Navigation. Khi chuyển sang Academic mode, toàn bộ trang thay bằng layout CV học thuật (light cream theme). Business mode giữ nguyên 100% như hiện tại.

---

## 1. Architecture

### State management
- `mode: 'business' | 'academic'` lưu trong React state tại `page.tsx`
- Truyền `setMode` xuống `Navigation` qua prop
- Khi mode thay đổi: set attribute `document.documentElement.setAttribute('data-mode', mode)` để CSS variables kích hoạt

### Conditional render trong `page.tsx`
```tsx
{mode === 'business' ? <BusinessLayout /> : <AcademicPage mode={mode} setMode={setMode} />}
```
- `<Navigation>` luôn render ở cả 2 mode (để user toggle trở lại được)
- Transition: fade 300ms bằng Framer Motion `AnimatePresence`

### File mới
- `src/components/AcademicPage.tsx` — full academic layout component
- `src/data/academic.ts` — typed data từ CV (bài báo, sách, giải thưởng)

### File sửa
- `src/app/globals.css` — thêm `[data-mode="academic"]` color overrides
- `src/components/Navigation.tsx` — thêm toggle pill + mode prop
- `src/app/page.tsx` — thêm mode state + conditional render

---

## 2. Navigation Toggle

### Desktop
- Pill toggle nằm bên trái button "Call số điện thoại"
- Label: `Business  •  Academic`
- Dot indicator: viên tròn nhỏ trượt animated giữa 2 label
- Active label: sáng/opaque; inactive: mờ (opacity 45%)
- Màu indicator: `--color-gold` khi Business, `#8B6914` khi Academic
- Style: border mỏng `border-line`, nền trong suốt, font mono, text-[10px] tracking-wider uppercase

### Mobile
- Icon nhỏ nằm cạnh icon hamburger menu: `[logo] ... [mode-icon] [menu-icon]`
- Icon: toggle giữa graduation cap SVG (Academic) và briefcase SVG (Business)
- Tap trực tiếp để switch mode, không cần mở menu drawer
- Không hiện trong mobile drawer

---

## 3. Academic Page Layout

### Desktop (≥768px) — 2 cột
```
┌─────────────────────────────────────────────┐
│  Navigation (giữ nguyên, theme đổi màu)      │
├──────────────┬──────────────────────────────┤
│  Sidebar     │  Main content area            │
│  ~240px      │  flex-1                       │
└──────────────┴──────────────────────────────┘
```

**Sidebar (cột trái):**
- Avatar tròn `/assets/avatar-3.png` — 80px diameter
- Tên: **Nguyễn Lê Bảo Hoàng** (font heading, bold)
- Học vị: Tiến sĩ Tâm lý học (font mono, muted)
- Đơn vị: Trường Đại học Sư phạm TP.HCM (small, muted)
- Năm công nhận: 2025
- Separator `<hr>`
- Menu tab dọc (4 mục, top-to-bottom):
  1. Bài báo
  2. Hội thảo
  3. Sách
  4. Giải thưởng
- Active tab: left border accent `--color-gold`, text đậm hơn

**Main content (cột phải):**
- Header: `[Tab name] · [số lượng items]` — font mono, small, muted
- List citation: mỗi entry có title, tác giả, tạp chí/hội thảo, năm
- Sub-groups bên trong tab "Bài báo": Bài báo quốc tế / Bài báo trong nước / Bài tham luận hội thảo
- Sub-group label: small caps, letter-spaced, separator line

**Default active tab:** Bài báo

### Mobile (<768px)
- Sidebar thu thành horizontal scrollable tab bar ở trên
- Main content bên dưới (full width)

---

## 4. Academic Data (từ CV)

### Tab: Bài báo
**Quốc tế (tạp chí):**
1. "The Role of Mental Health Literacy in Shaping Help-Seeking Behaviors among High School Students in Vietnam" — Hoang Le Bao Nguyen, Son Van Huynh, Quan Hong Bui — Saudi Journal Humanities Social Science — 2024
2. "Factors influencing help-seeking behavior for mental health problems in high school students" — Hoang Le Bao Nguyen, Son Van Huynh, Quan Hong Bui — Multidisciplinary Science Journal — 2024

**Trong nước:**
1. Hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần ở học sinh THPT trong bối cảnh hậu Covid: Một nghiên cứu tổng thuật — Tạp chí Khoa học Trường ĐHSP TP.HCM — 2024
2. Xây dựng các biện pháp cải thiện hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh trung học — Tạp chí Khoa học Xã hội, Nhân văn và Giáo dục — 2025
3. Mối liên hệ giữa mức độ stress, trầm cảm, lo âu và hành vi tìm kiếm sự trợ giúp của học sinh THPT — Tạp chí Thiết bị Giáo dục — 2024
4. Một số yếu tố ảnh hưởng đến hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh THPT — Tạp chí Giáo dục — 2024
5. Hành vi tìm kiếm sự trợ giúp về sức khoẻ tâm thần của học sinh THPT — Tạp chí Tâm lý học Việt Nam — 2024
6. Sức khoẻ tâm thần của học sinh THPT hậu Covid-19 — Tạp chí Nghiên cứu dân tộc — 2024
7. Getting children ready for school: Familiarization with numerical symbols — Tạp chí Khoa học Trường ĐHSP TP.HCM — 2021
8. EEG machine and the neuro-science research in Vietnam — Tạp chí Khoa học Trường ĐHSP TP.HCM — 2021

### Tab: Hội thảo
**Quốc tế:**
1. "Factors affecting the development of school counselors in the Southern region of Vietnam – The management perspective" — International Conference on Educational Innovation (Taiwan) — 11/2019

**Trong nước:**
1. Nghiên cứu về hành vi tự cô lập – Hướng nghiên cứu cần quan tâm ở học đường — Hội thảo Tâm lý học học đường lần 6 — 2018
2. Khởi nghiệp từ đề tài phòng tránh xâm hại tình dục trẻ em của sinh viên ngành tâm lý học — Hội thảo khởi nghiệp sinh viên ngoài sư phạm — 2018
3. Mô hình tham vấn học đường trường THCS và THPT Việt Anh — Hội thảo Phát triển mô hình tham vấn học đường — 2017

### Tab: Sách
1. Câu chuyện Đạo đức (Lớp 1) — Sách tham khảo — NXB ĐHSP TP.HCM — 2022
2. Thực hành Kỹ năng sống (Lớp 11) — SGK — NXB Giáo dục Việt Nam — 2021
3. Văn hoá Học đường (Lớp 4) — SGK — NXB Giáo dục Việt Nam — 2021
4. Sáng Tạo Với Màu Nước Và Giấy (Tập 1 & 2) — Sách tham khảo — NXB ĐHSP TP.HCM — 2017
5. Kỹ Năng Phòng Tránh Xâm Hại Cho Trẻ Mầm Non — Sách tham khảo — NXB ĐHSP TP.HCM — 2017
6. Kỹ Năng Phòng Tránh Xâm Hại Cho Học Sinh Tiểu Học — Sách tham khảo — NXB ĐHSP TP.HCM — 2017

### Tab: Giải thưởng
1. Giải Ba — Hội thi sáng tạo kỹ thuật TP.HCM 2015–2016 — Đề tài: Thử nghiệm một số biện pháp nâng đỡ cảm xúc cho trẻ bị lạm dụng tình dục
2. Giải Ba — Giải thưởng Sinh viên NCKH Eureka lần 18 (2016) — Đề tài: Thử nghiệm một số biện pháp nâng đỡ cảm xúc cho trẻ bị lạm dụng tình dục
3. Giải khuyến khích — Sinh viên NCKH 2016–2017, Trường ĐHSP TP.HCM — Đề tài: Vận dụng "Năm điều Bác Hồ dạy" vào xây dựng sách ảnh giáo dục đạo đức cho học sinh tiểu học

---

## 5. Color Theme

CSS variables override dưới `[data-mode="academic"]`:

| Token | Business | Academic |
|---|---|---|
| `--color-bg` | `#050505` | `#F5F0E8` |
| `--color-surface` | `rgba(255,255,255,0.035)` | `rgba(0,0,0,0.04)` |
| `--color-surface-strong` | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.07)` |
| `--color-text-primary` | `#F4F1EA` | `#1A1612` |
| `--color-text-secondary` | `rgba(244,241,234,0.68)` | `rgba(26,22,18,0.60)` |
| `--color-text-muted` | `rgba(244,241,234,0.45)` | `rgba(26,22,18,0.40)` |
| `--color-gold` | `#C8A85A` | `#8B6914` |
| `--color-gold-soft` | `rgba(200,168,90,0.16)` | `rgba(139,105,20,0.12)` |
| `--color-gold-dim` | `rgba(200,168,90,0.08)` | `rgba(139,105,20,0.06)` |
| `--color-line` | `rgba(255,255,255,0.08)` | `rgba(26,22,18,0.08)` |
| `--color-line-strong` | `rgba(255,255,255,0.12)` | `rgba(26,22,18,0.12)` |

---

## 6. Transition

- `AnimatePresence` + `motion.div` fade `opacity: 0 → 1`, duration 300ms
- Đồng thời với CSS variable swap — không cần thêm gì
