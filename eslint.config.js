import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

/**
 * ESLint v9+ uses "flat config" by default.
 * This file bridges the existing `.eslintrc.json` style config by reusing
 * Next.js' recommended rules via compatibility mode.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals"),
];


