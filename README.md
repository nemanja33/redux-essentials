# Redux Essentials Example App

A blogging platform built while following the [Redux Essentials tutorial](https://redux.js.org/tutorials/essentials/part-3-data-flow). Demonstrates real-world Redux patterns including CRUD operations, async thunks, and normalized state.

## Stack

- [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit 2](https://redux-toolkit.js.org/)
- [React Router 6](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [MSW](https://mswjs.io/) for API mocking

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start the dev server |
| `yarn build` | Build for production |
| `yarn preview` | Preview the production build |

## Project Structure

```
src/
  api/          # API client and MSW mock server
  components/   # Shared and feature UI components
  pages/        # Page-level route components
  redux/        # Redux store, slices, and selectors
  App.tsx       # Root component with routing
```

## Branches

- `master` — starting point for the tutorial (initial config only)
- `tutorial-steps-ts` — committed step-by-step as the tutorial progresses

## Package Manager

This project uses [Yarn 4](https://yarnpkg.com/). To switch to npm, pnpm, or bun: delete `"packageManager"` from `package.json` and remove `.yarnrc.yml` and `yarn.lock`, then install with your preferred tool.
