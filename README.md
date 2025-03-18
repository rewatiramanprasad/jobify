## Deployment Guide

- First choose the repository.
- insert manually variable environment such as NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY and DATABASE_URL.
- check the formatting:

```bash
npm run lint
# and
npm run types-check
```

- build command be mention below:

```bash
npx prima generate && npm run build
```

- [vercel link](https://jobify-two-delta.vercel.app/)

## Routes

public route:

- /

Private route:

- /add-job
- /jobs
- /jobs/[id]
- stats

## technology stacks

- Next.js
- React 19
- TailwindCss 4
- Tanstack/react-query 5
- Shadcn/ui
- zod
- Recharts 2
- Prisma 5
- Typescript 5
