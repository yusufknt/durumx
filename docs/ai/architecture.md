# Architecture Guidelines

This project follows a strict **Domain-driven / Feature-based Architecture** using the Next.js App Router.

## General Rules
1. **Thin Pages (`src/app/**/page.tsx`)**: 
   - A `page.tsx` file MUST be a thin orchestrator.
   - It should NOT contain complex UI logic, huge state blocks, or inline data arrays.
   - It should mainly import sections from `src/components/sections/[feature]/` and render them.

2. **No Spaghetti Code**:
   - Do not dump everything into a single file. If a component grows beyond a few hundred lines and handles multiple responsibilities (e.g., fetching, complex UI, modals), break it down.

3. **Global Layout (`src/app/layout.tsx`)**:
   - Only used for root HTML structure and global providers.
   - Modals and popups must be wrapped in Context Providers (e.g., `src/providers/ModalProvider.tsx`) and imported here, not hardcoded inline.
