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
- Sort by stars, forks, or recently updated (GitHub's own search API supports those three)
- Pagination via a "Load more" button
- Loading skeletons, an empty state, and a rate-limit error state

**Tracking**
- Track / untrack any repo from search results
- Tracked repos persist in `localStorage`, so refreshing the page doesn't lose your list
- Each tracked repo shows live stats: stars, open issues, forks, last commit date
- Refresh a single repo, or hit "Refresh All" to pull fresh data for everything you're tracking
- Each card has its own independent loading and error state, so if one repo fails to refresh (rate limit, repo got deleted, whatever) it doesn't break the rest
- Sort the tracked list by stars, forks, open issues, or recently updated
- A small stats strip at the top totals up stars/issues/forks across everything you're tracking
- Cards are clickable and open the repo on GitHub in a new tab
- Toast notification when you track/untrack something

**Charts**
- Bar chart comparing stars across tracked repos
- Plus a forks leaderboard, an open issues donut chart, and a languages breakdown, these weren't required but felt like a natural extension once the stars chart was already there

**Other**
- Dark/light theme toggle that persists automatically via MUI's color scheme storage
- Fully responsive

---

## Architecture / technical decisions

A few things worth explaining:

**Why Redux Toolkit + RTK Query instead of just `useState`/`fetch`**
RTK Query handles caching, loading/error states, and refetching out of the box, which meant I didn't have to hand-roll any of that. It also naturally solves the "independent loading state per repo" requirement, each `TrackedCard` calls `useGetRepoByFullNameQuery` independently, so each one has its own `isFetching`/`isError`, with no manual wiring needed between components.

**Tracked repos: storing refs, not snapshots**
The Redux slice for tracked repos only stores `{ id, full_name }` for each repo, not the full stats. The actual live data (stars, issues, etc.) always comes from RTK Query's cache. This means there's exactly one source of truth for "what does this repo's stats look like right now," instead of two copies that could drift out of sync (one in Redux, one in the API cache). `localStorage` only remembers *which* repos you're tracking, not their stats at some past point in time.

**Search pagination**
Search results accumulate in local state as you click "Load more" (rather than RTK Query's cache doing the merging), with a `page` counter that resets back to 1 whenever the search term or sort changes. The search results are typically stored on the caller side.

**Toast notifications via Context, not Redux**
Track/untrack success messages use React Context rather than adding them to the Redux store. Toast state is pure, UI feedback, it doesn't need to be inspected in Redux DevTools the way app data does, so it felt like the wrong fit for the store.

---

## limitations
 
- **Rate limits.** Unauthenticated GitHub API calls are capped at 60 requests/hour. Tracking a handful of repos and hitting "Refresh All" a few times can get you there faster than you'd expect. There's a visible error state for this.
- **"Recently updated" isn't strictly "last commit."** GitHub's `sort=updated` on search results is based on the repo's general `updated_at` field, which can shift from things other than pushes. It's usually close to last commit but not a guaranteed match.
