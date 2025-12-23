# Generic Restaurant - Modern Web Experience

A high-performance, SEO-optimized restaurant landing page built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

🔗 **Live Demo:** [https://interview-sample.vercel.app](https://interview-sample.vercel.app)

---

## 🚀 Key Features

- **⚡ Zero-Bundle-Size Navigation**: Hash-based smooth scrolling for instant navigation.
- **🎨 Dynamic UI**: Infinite looping carousels and interactive menu sections.
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop.
- **🏎️ High Performance**: 95+ Core Web Vitals score.

---

## 🛠️ The Migration Story: React.js to Next.js

This project was originally a client-side React application. We migrated to **Next.js 15** to unlock superior performance, SEO capabilities, and better developer experience.

### 1. Performance Optimization

We moved from a standard implementation to a highly optimized one using Next.js native features:

- **Variable Fonts (`next/font`)**:
     - _Before_: Loading Google Fonts via CDN caused "Flash of Unstyled Text" (FOUT) and layout shifts.
     - _After_: Self-hosted fonts are injected at build time with zero layout shift (CLS).
- **Image Optimization (`next/image`)**:
     - _Before_: Large JPEGs/PNGs slowed down Largest Contentful Paint (LCP).
     - _After_: Automatic conversion to WebP/AVIF, lazy loading, and device-appropriate sizing.
- **Code Splitting**:
     - Heavy interactive sections (Charts, Maps, Carousels) are lazy-loaded using `next/dynamic`, reducing the initial JavaScript payload.

### 2. SEO Engineering

We implemented an advanced SEO strategy to ensure search engine visibility:

- **Server-Side Rendering (SSR)**: Critical content is rendered on the server, making it instantly readable by crawlers.
- **Dynamic Metadata**:
     - Comprehensive `OpenGraph` and `Twitter` cards for beautiful social sharing.
     - Canonical URLs and correct `robots.txt` configuration.
- **Structured Data**:
     - Injected `JSON-LD` schema for "Restaurant" to help Google understand the business context (menu, location, price range).
- **Sitemap Engine**:
     - Automated `sitemap.xml` generation using Next.js Route Handlers.

---

## 💻 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Fonts**: [Inter, Roboto, Bebas Neue (next/font)](https://nextjs.org/docs/basic-features/font-optimization)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ established

### Installation

1.    **Clone the repository**

      ```bash
      git clone https://github.com/your-username/generic-restaurant.git
      cd generic-restaurant
      ```

2.    **Install dependencies**

      ```bash
      npm install
      ```

3.    **Run the development server**

      ```bash
      npm run dev
      ```

4.    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🏗️ Project Structure

```bash
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── layout.tsx        # Root layout (Metadata, Fonts, Providers)
│   ├── page.tsx          # Homepage (Hero, About, etc.)
│   └── sitemap.ts        # Dynamic Sitemap Generation
├── components/           # React Components
│   ├── layout/           # Header, Footer
│   ├── sections/         # Page Sections (Hero, Testimonials)
│   └── ui/               # Reusable UI elements (Buttons, Cards)
├── assets/               # Static Images & SVGs
└── styles/               # Global CSS & Tailwind Directives
```

---

## 📝 License

This project is open-source and available under the MIT License.
