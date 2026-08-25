# Nipul Kanishka — Developer Portfolio

A production-focused Next.js portfolio for Nipul Kanishka, an NIBM BSc (Hons) in Computing undergraduate. The site presents source-verified public projects across mobile, web, APIs, data and games without invented experience or metrics.

## Stack

- Next.js App Router, React and strict TypeScript
- Tailwind CSS with project-level design tokens
- Framer Motion, Lucide and React Icons
- GitHub REST API with Zod validation and hourly revalidation
- Zod-validated contact endpoint with honeypot and basic rate limiting
- Web3Forms-compatible delivery and Vercel Analytics
- Vitest and Testing Library

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Useful commands:

```bash
npm run build
npm run lint
npm test
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL and sitemap origin |
| `GITHUB_TOKEN` | No | Server-only token for higher GitHub API limits |
| `WEB3FORMS_ACCESS_KEY` | Contact form | Web3Forms key connected to your receiving email |

Create the key at [Web3Forms](https://web3forms.com/) using the email address that should receive portfolio messages. Add it to `.env.local` when developing and to your hosting provider's environment variables in production, then restart or redeploy. Never prefix the key with `NEXT_PUBLIC_`. Without it, the form displays a clear configuration message and social links remain usable. The in-memory limiter is appropriate as a lightweight guard; for higher-volume production use, replace it with a durable store such as Vercel KV or Upstash.

## Content editing

Profile, projects, skills and social links are in `data/`. Shared contracts are in `types/index.ts`.

- Add a project to `data/projects.ts`; give it a unique slug, real repository URL and only source-verified details. A case-study URL is generated automatically.
- Add a skill to `data/skills.ts` using an icon export from `react-icons/si` or `react-icons/fa6`. Unknown icon names use the code fallback.
- A resume button is intentionally absent. Add a real file to `public/` first, then add the link in `components/hero.tsx`.
- No portrait is used. To add a confirmed photo, put an optimised image in `public/`, render it with `next/image`, and write descriptive alt text.
- Replace the generated `public/og.png` if the branding changes.

## GitHub integration

`lib/github.ts` makes one cached profile request and one cached repository request, validates both responses and derives the repository-language chart. Failed requests return conservative local fallback data. A GitHub token is never sent to the browser.

## Contact configuration

Create a Web3Forms access key, set the recipient variables, and redeploy. The API validates input on the server and client, includes a hidden honeypot, rate-limits repeated requests and returns explicit loading, success and error states.

## Deployment on Vercel

1. Push the repository to GitHub and import it into Vercel.
2. Add the environment variables for Preview and Production.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
4. Run the deployment and confirm `/sitemap.xml`, `/robots.txt`, project routes and the contact endpoint.
5. Test one real form submission and inspect Analytics only after consent requirements for the target audience are reviewed.

## Deployment checklist

- [ ] Replace the license placeholder
- [ ] Configure the canonical production domain
- [ ] Add the confirmed contact email and form provider key
- [ ] Test every repository and social link
- [ ] Run `npm run build`, `npm run lint`, and `npm test`
- [ ] Verify keyboard navigation, mobile menu, both themes and reduced motion
- [ ] Run Lighthouse at 360 px and desktop sizes
- [ ] Add only real resume, portrait, screenshots and live-demo URLs

## Troubleshooting

- GitHub values showing dashes: check GitHub rate limits and optionally add `GITHUB_TOKEN`.
- Contact returns 503: configure `WEB3FORMS_ACCESS_KEY` and restart or redeploy.
- Wrong canonical URLs: set `NEXT_PUBLIC_SITE_URL` without a trailing slash and rebuild.
- A skill icon falls back: confirm the exact React Icons export name.
- Font fetching fails during a restricted offline build: rerun with network access; Next.js bundles the fonts at build time.

## Owner information still needed

Keep these hidden until confirmed: email address, location, professional photograph, resume/CV, authentic project screenshots, live-demo URLs, detailed LinkedIn education, certifications, employment or internships, awards, preferred form provider and personal domain.
