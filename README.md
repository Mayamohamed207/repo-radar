# Repo Radar

A dashboard where you can search GitHub repos, track the ones you care about, and keep an eye on their stats (stars, forks, open issues, last commit, Languages) without having to go back to GitHub every time.

![Repo Radar dashboard](docs/images/hero.png)

---

## Tech stack

- React 19 + TypeScript
- Redux Toolkit + RTK Query (state + data fetching)
- MUI (components + theming)
- MUI X Charts (the bar/donut charts)
- GitHub REST API (`api.github.com`)
- Vite
- Storybook (component stories for the main UI pieces)
- Monorepo: shared UI and charts split into their own packages

---

## Running it locally

```bash
git clone https://github.com/Mayamohamed207/repo-radar.git
cd repo-radar
npm install
npm run dev
```

To run Storybook:

```bash
npm run storybook
```

---

## What it does

**Search**
- Debounced search against GitHub's repo search API (waits 500ms after you stop typing before firing a request, so it's not spamming the API on every keystroke)
- Pagination via a "Load more" button
- Loading skeletons, an empty state, and a rate-limit error state

![Search results](docs/images/search.png)

**Tracking**
- Track / untrack any repo from search results
- Tracked repos persist in `localStorage`, so refreshing the page doesn't lose your list
- Each tracked repo shows live stats: stars, open issues, forks, last commit date
- Refresh a single repo, or hit "Refresh All" to pull fresh data for everything you're tracking
- Each card has its own independent loading and error state, so if one repo fails to refresh it doesn't break the rest
- Cards are clickable and open the repo on GitHub in a new tab

**Charts**
- Bar chart comparing stars across tracked repos

| Stars | Forks |
|---|---|
| ![Stars](docs/images/charts-stars.png) | ![Forks](docs/images/charts-forks.png) |
| **Open issues** | **Languages** |
| ![Issues](docs/images/charts-issues.png) | ![Languages](docs/images/charts-languages.png) |

---

## Bonus additions

- **Monorepo architecture** — the app is split into three npm workspaces: `apps/web` (the app itself), `packages/ui` (generic components like `Logo`, `Navbar`, `RepoStatsRow`), and `packages/charts` (the chart tab switcher and all four chart types).
- **Storybook** — stories for the main UI pieces (`RepoCard`, `TrackedCard`, `SearchBar`, `SearchResults`, `Navbar`, `ChartsContainer`), including loading/error/empty states for the ones that depend on the API.
- **Theme switching** — dark/light toggle, persisted automatically via MUI's color scheme storage

| Light | Dark |
|---|---|
| ![Light theme](docs/images/theme-light.png) | ![Dark theme](docs/images/theme-dark.png) |

- **Clickable repo cards** — cards in both the search results and the tracked list open the repo on GitHub in a new tab
- **Extra charts** — forks leaderboard, open issues donut, languages breakdown, in addition to the required stars comparison
- **A stats strip** — totals stars/issues/forks across everything tracked, so you get a sense of the whole list at a glance
- **Sort options** — both search results and tracked repos can be sorted (stars/forks/recently updated), not just displayed in fetch order
- **Toast notifications** — feedback when tracking/untracking a repo
- **Fully responsive layout with framer motion animation**

![Mobile layout](docs/images/mobile.png)

---

## Storybook

![Storybook overview](docs/images/storybook-overview.png)

| Navbar (desktop and mobile) | SearchResults states |
|---|---|
| ![Navbar story](docs/images/storybook-navbar.png) | ![SearchResults states](docs/images/storybook-states.png) |

---

## Folder structure

```
repo-radar/
  apps/
    web/                  The actual application
      src/
        api/              GitHub API setup (RTK Query endpoints)
        features/
          search/         Everything about searching: SearchBar, SearchResults,
                           RepoCard, and useRepoSearch (the hook that owns the
                           whole search flow: debounce, pagination, status)
          tracked/        Everything about tracked repos: TrackedCard, TrackedView,
                           StatsBar, the Redux slice, the live-data selector
        providers/        App-wide React Context providers
        hooks/            
        store/            Redux store setup
        theme/            MUI theme
        styles/           CSS variables (light/dark tokens)
        types/            Shared TypeScript types
        test/             Shared test for stories 
      .storybook/         Storybook config
  packages/
    ui/                   Generic components used across the app: Logo, Navbar,
                          RepoStatsRow, SortSelect. Imported as @repo-radar/ui
    charts/               The chart tab switcher and all four chart types
                          (stars, forks, issues, languages). Imported as
                          @repo-radar/charts
```

---

## Architecture and technical decisions

**Why a monorepo.** Splitting `ui` and `charts` into their own packages keeps them reusable and independent of the app: `ui` knows nothing about Redux, and `charts` just takes an array of repos. The structure is also scalable, since new apps or packages can be added without restructuring. Unlike a polyrepo, where every shared change means publishing a package and bumping versions in each consumer, npm workspaces link everything locally, so changes show up in the app immediately, with one clone and one `npm install`.

**Why RTK Query instead of `useState` + `fetch`.** Caching, loading/error flags, and refetching come built in. This matters most for independent loading states: each `TrackedCard` calls `useGetRepoByFullNameQuery` on its own, so it gets its own `isFetching` and `isError` with no manual wiring between components. If one repo's request fails (deleted repo, rate limit), the others are unaffected, and RTK Query's cache means switching away and back doesn't trigger unnecessary refetches.

**Tracked repos remember what, not what-it-looked-like.** The Redux slice only stores `{ id, full_name }` per tracked repo, never the stats. Stars, issues, forks always come live from RTK Query's cache. That way there's exactly one place that knows what a repo's numbers currently are, instead of a Redux copy and a cache copy that could quietly drift apart. `localStorage` only remembers which repos you're tracking, nothing about their state at some past moment. Reading that live data back out (for the charts, the stats strip) goes through a small selector built with `createSelector`, so it doesn't get flagged as producing a new array on every render for no reason.

**Each tracked card fetches independently.** That's what makes the loading/error states genuinely independent per card, if one repo's request fails (deleted repo, rate limit), it doesn't touch the others, and RTK Query's own caching means switching away and back doesn't refetch unnecessarily.

**Failures aren't all the same failure.** A 404 means the repo was deleted or renamed, while a 403 means the rate limit was hit. `TrackedCard` checks the actual status and shows a matching message instead of a generic "something went wrong."

**Search pagination lives in one place.** Debouncing, accumulating pages as "Load more" gets clicked, resetting everything when the term or sort changes, and collapsing GitHub's raw loading/error flags into one status, all of it in a single hook, `useRepoSearch`. `App.tsx` just renders whatever comes back from it, rather than the state itself.

**Toasts live in Context, not Redux.** Track/untrack confirmations are transient UI feedback.

---

## Limitations

- **Rate limits.** Unauthenticated GitHub API calls are capped at 60 requests/hour. Tracking a handful of repos and hitting "Refresh All" a few times can get you there faster than you'd expect. There's a visible error state for this.
- **"Recently updated" isn't strictly "last commit."** GitHub's `sort=updated` on search results is based on the repo's general `updated_at` field, which can shift from things other than pushes. It's usually close to last commit but not a guaranteed match.