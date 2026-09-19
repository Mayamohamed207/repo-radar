# Repo Radar

A dashboard where you can search GitHub repos, track the ones you care about, and keep an eye on their stats (stars, forks, open issues, last commit, Languages) without having to go back to GitHub every time.


---

## Tech stack

- React 19 + TypeScript
- Redux Toolkit + RTK Query (state + data fetching)
- MUI (components + theming)
- MUI X Charts (the bar/donut charts)
- GitHub REST API (`api.github.com`)
- Vite
- Storybook (component stories for the main UI pieces)

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

**Tracking**
- Track / untrack any repo from search results
- Tracked repos persist in `localStorage`, so refreshing the page doesn't lose your list
- Each tracked repo shows live stats: stars, open issues, forks, last commit date
- Refresh a single repo, or hit "Refresh All" to pull fresh data for everything you're tracking
- Each card has its own independent loading and error state, so if one repo fails to refresh it doesn't break the rest
- Cards are clickable and open the repo on GitHub in a new tab

**Charts**
- Bar chart comparing stars across tracked repos

---

## Bonus additions

- **Storybook** — stories for the main UI pieces (`RepoCard`, `TrackedCard`, `SearchBar`, `SearchResults`, `Navbar`, `ChartsContainer`), including loading/error/empty states for the ones that depend on the API.
- **Theme switching** — dark/light toggle, persisted automatically via MUI's color scheme storage
- **Extra charts** — forks leaderboard, open issues donut, languages breakdown, in addition to the required stars comparison
- **A stats strip** — totals stars/issues/forks across everything tracked, so you get a sense of the whole list at a glance
- **Sort options** — both search results and tracked repos can be sorted (stars/forks/recently updated), not just displayed in fetch order
- **Toast notifications** — feedback when tracking/untracking a repo
- **Fully responsive layout**

---

## Folder structure

```
src/
  api/              GitHub API setup
  components/       Generic, reusable anywhere: Logo, Navbar, RepoStatsRow
  features/
    search/         Everything about searching: SearchBar, SearchResults,
                     RepoCard, SortSelect, and useRepoSearch (the hook that
                     owns the whole search flow: debounce, pagination, status)
    tracked/         Everything about tracked repos: TrackedCard, TrackedView,
                     StatsBar, the Redux slice, the live-data selector
      Charts/        The chart tab switcher
        charts/      The individual chart types
  providers/        App-wide React Context providers
  hooks/            
  store/            Redux store setup
  theme/            MUI theme
  styles/           CSS variables (light/dark tokens)
  types/            Shared TypeScript types
  testing/          Shared test/story fixtures (makeRepo)
```
---
## Architecture and technical decisions

**Why RTK Query instead of `useState` + `fetch`.** Caching, loading/error flags, and refetching all come for free, which matters most for the "independent loading state per repo" requirement, each `TrackedCard` calls `useGetRepoByFullNameQuery` on its own, so each one gets its own `isFetching`/`isError` with zero manual wiring between components.

**Tracked repos remember what, not what-it-looked-like.** The Redux slice only stores `{ id, full_name }` per tracked repo, never the stats. Stars, issues, forks always come live from RTK Query's cache. That way there's exactly one place that knows what a repo's numbers currently are, instead of a Redux copy and a cache copy that could quietly drift apart. `localStorage` only remembers which repos you're tracking, nothing about their state at some past moment. Reading that live data back out (for the charts, the stats strip) goes through a small selector built with `createSelector`, so it doesn't get flagged as producing a new array on every render for no reason.

**Each tracked card fetches independently.** That's what makes the loading/error states genuinely independent per card, if one repo's request fails (deleted repo, rate limit), it doesn't touch the others, and RTK Query's own caching means switching away and back doesn't refetch unnecessarily.

**Failures aren't all the same failure.** A 404 (repo got deleted or renamed) and a 403 (rate limit). `TrackedCard` checks the actual status and shows a message that matches what's really happening, instead of one generic "something went wrong."

**Search pagination lives in one place.** Debouncing, accumulating pages as "Load more" gets clicked, resetting everything when the term or sort changes, and collapsing GitHub's raw loading/error flags into one status, all of it in a single hook, `useRepoSearch`. `App.tsx` just renders whatever comes back from it, rather than the state itself.

**Toasts live in Context, not Redux.** Track/untrack confirmations are transient UI feedback.

---
## limitations
 
- **Rate limits.** Unauthenticated GitHub API calls are capped at 60 requests/hour. Tracking a handful of repos and hitting "Refresh All" a few times can get you there faster than you'd expect. There's a visible error state for this.
- **"Recently updated" isn't strictly "last commit."** GitHub's `sort=updated` on search results is based on the repo's general `updated_at` field, which can shift from things other than pushes. It's usually close to last commit but not a guaranteed match.
