# Restaurant App

This app is built with **Next.js (App Router) + React + TypeScript + Tailwind CSS**.

**Live Demo:** [Link to the live project](https://interview-sample.vercel.app)  

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the app with `npm run dev`.

## Scripts

- `npm run dev`: start the development server
- `npm run build`: create a production build
- `npm run start`: run the production server (after `build`)
- `npm run lint`: run ESLint

## Project structure (src/)

- **`src/app/`**: Next.js App Router entry points (`layout.tsx`, `page.tsx`).
- **`src/components/`**: Shared UI, organized by responsibility:
  - **`layout/`**: app “frame” pieces (e.g. `Header`, `Footer`)
  - **`sections/`**: page sections composed by `page.tsx`
  - **`ui/`**: reusable low-level UI blocks (e.g. `Carousel`)
- **`src/assets/`**: local images/icons used by components.
- **`src/types/`**: shared TypeScript declarations (e.g. static asset modules).

## Notes

- The home page uses hash anchors (`#about`, `#menu`, `#testimonials`, `#contact`) for quick navigation.