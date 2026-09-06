# Data Management Guidelines

This project strictly separates data from UI components.

## Where to Find and Edit Data
All hardcoded data, constants, and mock information MUST live in the `src/constants/` directory.

- **Menu & Products**: `src/constants/menu.ts`
  - *Task example*: "Update the price of Et Döner", "Add a new Burger category" -> Edit this file.
- **Branches & Locations**: `src/constants/branches.ts`
  - *Task example*: "Add a new branch in Istanbul", "Update the phone number of the Van branch" -> Edit this file.
- **General Constants**: `src/constants/index.ts`
  - Contains home page features, categories, and company history.

## Typing
All data structures must be typed. Types are located in `src/types/index.ts`.
If you create a new data list, ensure you export an interface for it in the types file.

## Rules
- NEVER inline massive data arrays directly inside a React component (e.g., inside `src/app/page.tsx` or `MenuGrid.tsx`). Always map over data exported from `src/constants/`.
