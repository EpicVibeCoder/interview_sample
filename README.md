# Restaurant App

This app is created in **Next.js + React + TypeScript**.

**Live Demo:** [Link to the live project](https://interview-sample.vercel.app)  

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the app with `npm run dev`.

## Project structure (src/)

- **`src/app/`**: Next.js App Router entry points (`layout.tsx`, `page.tsx`).
- **`src/components/`**: Shared UI, organized by responsibility:
  - **`layout/`**: app “frame” pieces (e.g. `Header`, `Footer`)
  - **`sections/`**: page sections composed by `page.tsx`
  - **`ui/`**: reusable low-level UI blocks (e.g. `Carousel`)
- **`src/assets/`**: local images/icons used by components.
- **`src/types/`**: shared TypeScript declarations (e.g. static asset modules).