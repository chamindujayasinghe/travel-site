# Ceylon Trails — Sri Lanka Travel & Tourism Booking

A modern, fully responsive travel booking website for discovering and booking trips across Sri Lanka —
from the Sigiriya rock fortress and the tea hills of Ella to leopard safaris in Yala and the surf at Arugam Bay.

Built for the **Full-Stack Developer Intern (Frontend and Mobile)** technical assessment.

**Live demo:** https://travel-site-two-mu.vercel.app

## Features

### Home (`/`)
- Full-screen hero with destination search and quick links (Ella · Beach · Wildlife)
- Live stats calculated from the data (destinations, travel styles, average rating)
- Featured destinations with loading skeletons and an error state
- "Browse by travel style" tiles that open Explore with the category pre-selected
- "Why Ceylon Trails" and traveller testimonials

### Explore Destinations (`/destinations`)
- 12 destinations with realistic Sri Lanka sample data (images, descriptions, ratings, prices)
- Search by name, location, region, category or highlight (e.g. "leopard")
- Filters: category, region and max price — plus sorting (recommended, price, rating)
- All filters live in the URL (`?q=&category=&region=&maxPrice=&sort=`) so results can be shared and survive a reload
- Removable filter chips, result count, desktop sidebar and a collapsible mobile filter panel
- Loading, empty ("No destinations match") and error states

### Destination Details (`/destinations/:id`)
- Image gallery with thumbnails
- Description, highlights, activities with durations, price and rating
- Booking form with validation (name, email, start date, travellers), live total price and a confirmation screen with a booking reference
- "You might also like" related destinations
- Loading skeleton, error state and a "Destination not found" state for invalid links

### About (`/about`)
- Company story, live stats from the data (destinations, travel styles, rating, reviews), why travel with us and a call to action

### Contact (`/contact`)
- Contact details and a contact form (name, email, subject, message) with validation, a character counter
  and a "Message sent" confirmation

### General
- Responsive layouts for mobile, tablet and desktop
- Sticky navbar with mobile menu, footer, 404 page
- Accessibility: semantic HTML, labelled form fields, inline error messages linked with `aria-describedby`,
  visible focus states, skip-to-content link, alt text and WCAG AA text contrast

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [React Router v7](https://reactrouter.com/)
- [lucide-react](https://lucide.dev/) icons
- Images from [Unsplash](https://unsplash.com/)

No backend or database — data is static TypeScript in `src/data`, served through a small simulated API
(`src/data/api.ts`) with a short delay so loading states are visible.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build     # type-check and build for production
npm run lint      # run ESLint
npm run preview   # preview the production build
```

## Testing the loading, empty and error states

| State | How to see it |
|---|---|
| Loading | Open any page — skeletons show for ~0.6s while the simulated API responds |
| Error | Add `?fail=1` to the URL, e.g. [`/destinations?fail=1`](https://travel-site-two-mu.vercel.app/destinations?fail=1) or `/destinations/ella?fail=1`, then click **Try again** to recover |
| Empty | On Explore, search for something like `xyz`, then click **Clear filters** |
| Not found | Open [`/destinations/atlantis`](https://travel-site-two-mu.vercel.app/destinations/atlantis) |
| Form validation | On any destination, click **Book now** with the form empty |

## Project structure

```
src/
├── components/
│   ├── details/      # ImageGallery, BookingForm, BookingSuccess, DetailsSkeleton, RelatedDestinations
│   ├── explore/      # FilterPanel, SortSelect, ActiveFilters
│   ├── home/         # Hero, FeaturedDestinations, CategoryGrid, WhyUs, Testimonials
│   └── ...           # Layout, Navbar, Footer, DestinationCard, SearchBar, Rating, states
├── data/             # destinations, testimonials, simulated API
├── hooks/            # useAsync (data / loading / error / retry)
├── pages/            # Home, Explore, DestinationDetails, NotFound
├── types/            # Destination types, categories and regions
└── utils/            # filtering & sorting, booking validation, formatting
```

## AI usage

I used **Claude Code** (Anthropic) as an AI coding assistant. The project was led by me and AI was used to assist, not to make decisions.

**How I worked:**
- I broke the assessment into phases (setup, data, shared components, Home, Explore, Details, polish).
- For every phase, I asked Claude Code to propose a short plan first. I reviewed each plan and made the decisions myself —
  the colour scheme, destinations, currency and pricing model, filters, booking-form fields and which sections to include —
  before any code was written.
- Claude Code then helped write the code for that phase, find suitable Unsplash photos and run the type-check and lint.
- **I checked every phase carefully before moving on**: I reviewed the code, tested the pages in the browser
  (including the loading, empty and error states and different screen sizes) and asked for changes where needed.
- I committed and pushed each phase to GitHub myself after reviewing it.

I understand the code and the reasoning behind it, and I can explain or change any part of it.
