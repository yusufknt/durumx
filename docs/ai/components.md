# Component Guidelines

This project organizes UI components based on their scope and reusability.

## Component Organization
1. **`src/components/sections/`**: 
   - These are large, page-specific feature blocks (e.g., `home/HomeHero.tsx`, `urunlerimiz/MenuGrid.tsx`, `subelerimiz/BranchList.tsx`).
   - *When to use*: If a component is specific to one page and represents a major visual block.
2. **`src/components/shared/`**: 
   - Components used across multiple different pages or sections (e.g., `OrderModal.tsx`, `Navbar.tsx`, `Footer.tsx`).
3. **`src/components/ui/`**: 
   - "Dumb", highly reusable atomic components (buttons, text inputs).

## Guidelines for AI
- **Single Responsibility**: A component should focus on doing one thing well. For example, a map should be its own component (`InteractiveMap`), separated from the list of branches.
- **Client vs Server Components**: 
  - By default, Next.js components are server components.
  - If a component uses `useState`, `useEffect`, or DOM events (onClick), ensure `"use client";` is at the very top of the file.
- **Naming Conventions**: Use PascalCase in English for filenames (e.g., `BranchCard.tsx`, NOT `SubeKart.tsx`). Text content inside the component should remain in Turkish.
