# Balaji R — Advanced Cloud & DevOps Engineering Portfolio

A personal portfolio website engineered for **Balaji R**, an aspiring AWS Cloud Engineer / Cloud Operations Engineer / DevOps Engineer / Backend Engineer.

Inspired by modern, editorial, and minimal engineering design aesthetics: generous whitespace, oversized typography, high-contrast dark sections, interactive architecture visualizers, personal photo integration, and a production-grade transactional email automation pipeline.

---

## 🚀 Live Tech Stack

- **Framework**: React 19 + TypeScript + Next.js App Router API Route support
- **Bundler & Tooling**: Vite 6 / Next.js
- **Styling**: Tailwind CSS + Custom Editorial Design System
- **Animation & Motion**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Email Service**: Resend Transactional Email Engine
- **Iconography**: Lucide React
- **Typography**: Space Grotesk, Plus Jakarta Sans, JetBrains Mono

---

## 📸 Personal Photo Integration

- **Official Portrait**: Balaji's authentic photograph in formal dark suit with red tie (`public/images/balaji-portrait.png`).
- **Hero Treatment**: Large editorial portrait overlapping oversized typography with smooth cursor-following spring physics, tilt, and scroll parallax.
- **About Section Treatment**: Asymmetric editorial card with portrait crop and technical metadata pills (`COIMBATORE, TN`, `2024–2028`).
- **Optimization**: WebP/PNG formats with eager priority loading above the fold and lazy loading in the About section.

---

## ✉️ Production Email Automation Pipeline

The contact section implements a real transactional email workflow (no mock `console.log`):

```text
Visitor Submits Form
       │
       ▼
POST /api/contact (Sanitization • Rate Limiting • Honeypot Check)
       │
       ▼
Resend Email Service
       ├───► Balaji's Inbox (balajicloud16@gmail.com)
       │     - Detailed inquiry notification
       │     - Direct Reply-To header pointing to visitor email
       │     - "REPLY TO VISITOR ↗" action button
       │
       └───► Visitor's Inbox (Automatic Confirmation)
             - Subject: "Thanks for reaching out — I received your message"
             - Responsive, table-based HTML email with Balaji's signature & LinkedIn
```

### Environment Configuration

Create or edit `.env.local`:

```env
# 1. Sign up free at https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# 2. Your destination email address
CONTACT_EMAIL=balajicloud16@gmail.com

# 3. Sender address (use onboarding@resend.dev for testing, or your verified domain e.g. hello@balajir.dev)
FROM_EMAIL=Balaji R <onboarding@resend.dev>
```

> **Note**: If `RESEND_API_KEY` is not configured, the API gracefully alerts the user with setup instructions and provides a 1-click direct `mailto:` fallback.

---

## ⚡ Key Features

1. **Editorial Hero Section**: Oversized typography (`CLOUD ENGINEER & BACKEND BUILDER`), official portrait integration with mouse parallax, floating technical pills, and live availability badge.
2. **Scroll-Triggered Word Highlighting**: Editorial statement transitioning from muted gray to near-black and vibrant magenta accent as the user scrolls.
3. **Interactive Cloud Shell (CLI Terminal)**: Functional interactive terminal supporting real commands (`whoami`, `focus`, `status`, `skills`, `uptime`, `certifications`, `contact`, `clear`), quick chips, and live typing.
4. **Architectural Workload Visualizers**:
   - **Self-Healing Kubernetes Platform**: Live orchestration flow with an interactive **"Simulate Crash & Auto-Recovery"** test trigger demonstrating automated remediation and zero downtime.
   - **AWS Cloud Infrastructure Platform**: Visual multi-tier VPC topology diagram highlighting ALB ingress, private compute auto-scaling, and CloudWatch telemetry.
5. **Project Case Study Drawers**: Detailed engineering dossiers for all 5 projects detailing The Problem, Objective, Architecture Overview, Technologies, Implementation Steps, and Challenges Solved.
6. **Academic & Certification Track**:
   - Authentic **AWS Certified Cloud Practitioner** In-Progress showcase.
   - Clean vertical education timeline from Secondary School (89%) and Higher Secondary (87.5%) to B.Tech IT at Dr. N.G.P. Institute of Technology.
7. **Verified Achievements**: Numbered cards for KPRIET Hackathon Special Cash Prize, 15-day AI workshop at CIT, 5-day IoT workshop at MIT Madras, and PSG iTech technical paper presentation.
8. **Cloud Thoughts**: Editorial expandable briefs covering Kubernetes probe mechanics, zero-trust IAM boundaries, Infrastructure as Code, and Linux kernel observability.
9. **Desktop Custom Cursor & Lenis Smooth Scroll**: Magnetic cursor states with automatic detection and graceful disabling on mobile/touch devices.

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run local development server (includes /api/contact dev middleware)
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL` (default: `balajicloud16@gmail.com`)
   - `FROM_EMAIL` (e.g. `Balaji R <onboarding@resend.dev>` or `contact@balajir.dev`)
4. Deploy! The `/api/contact` endpoint runs as a serverless route with zero configuration.

---

## 📄 Contact & Socials

- **Name**: Balaji R
- **Location**: Coimbatore, Tamil Nadu, India
- **Email**: [balajicloud16@gmail.com](mailto:balajicloud16@gmail.com)
- **Phone**: +91 6374766824
- **LinkedIn**: [linkedin.com/in/balaji-r-219a65332](https://linkedin.com/in/balaji-r-219a65332)
