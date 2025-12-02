# Copilot instructions for art-consolidated-fe

Quick orientation

- Next.js (app router) project. UI lives under `app/` (server components by default). Add `use client` at file top for client components (see `app/cart/page.tsx`).
- Cart state is managed via a React context `components/CartProvider` and consumed with `useCart()` (methods: items, removeItem, updateQuantity, totalQuantity, totalPrice, clear).
- Styling uses Tailwind utility classes (check `tailwind.config.js` if present). Images use `next/image` (ensure domains in `next.config.js`).

Key files & patterns

- app/layout.tsx — global wrappers (place site-wide Nav, Providers here so all pages share them).
- app/cart/page.tsx — client component example using `useCart()` and `next/image`. Follow same pattern for other interactive pages.
- components/CartProvider.tsx — single source of truth for cart; likely persists to localStorage. Use its API rather than duplicating cart logic.
- app/products/[id]/page.tsx — product details should be server component by default; switch to client if it needs `useCart()`.

Common tasks / commands

- Dev: npm run dev
- Build: npm run build && npm start
- Lint/format: npm run lint / npm run format (project may have these standard scripts; confirm in package.json)

Project-specific conventions

- Prefer server components for data fetching; only mark component with `use client` if it uses state/hooks/effects or context like `useCart`.
- Keep interactive UI (inputs, buttons) inside client components; server components should render initial markup.
- Use `next/image` with a constrained parent (height/width or relative + fill) — app/cart/page.tsx demonstrates `fill` with a fixed container.

Examples

- Make Nav global (preferred): add Nav + providers in `app/layout.tsx` so pages like `app/cart/page.tsx` don't duplicate header.
- Use Cart API:
  - read: const { items, totalPrice } = useCart()
  - mutate: updateQuantity(id, qty); removeItem(id); clear()

When editing

- If adding client behaviour, ensure `use client` is the first line.
- For routes, use `app/<route>/page.tsx` (server) or add a client wrapper when needed.
- Update `next.config.js` when adding external image domains.

If anything below is unclear or you want examples for a specific file (e.g. how to add Nav to layout.tsx or how CartProvider persists data), tell me which file to edit and I will generate the patch.
