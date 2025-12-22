/**
 * ESLint v9+ uses "flat config" by default.
 *
 * Next.js ships a flat config via `eslint-config-next`, so we can consume it
 * directly (no compat/bridge layer needed).
 */
import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...coreWebVitals,
  // Project-level overrides:
  // - This project uses the App Router, so `no-page-custom-font` is noisy/incorrect here.
  // - `<img>` is acceptable for this sample project (and keeps markup straightforward).
  {
    name: "project-overrides",
    rules: {
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;


