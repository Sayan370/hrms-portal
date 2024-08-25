This is a [Vite](https://vitejs.dev/) project bootstrapped with `npm create vite@latest`.

## Getting Started

Create a `.env.local` file and copy the contents of the `.env.example` file to it

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:8173](http://localhost:8173) with your browser to see the result.

You can start editing the page by modifying the pages under `pages` folder. The page auto-updates as you edit the file.

The layouts are under `layouts` folder.

Explore the `contexts` and `hooks` folders for more utilities.
You will find utility functions under `utils` folder and constants under `constants` folder.

## State Management

The project has `redux` installed for global state management. But, use it only when needed. Use contexts and local states for managing page states.

## Styling

This project uses [`tailwindcss`](https://tailwindcss.com/) to apply css styles to elements seamlessly.

This project also has `sass` integrated, the styles can be edited under `styles` folder.

## Routing

Routing can be edited under `routes` folder. Add new routes or edit existing.

Add route guards using various utility functions provided viz. `defineInvisibleRoute` , `defineAuthedRoute` , `defineNonAuthedRoute` , `definePublicRoute`.

Add layout routes with utility function `defineLayoutRoute`.

Add scope and role based guards with `allowedRoles` , `exceptRoles` , `allowedScopes`

## API

It has mock server implemented under the folder name `mocks`. Add new api mocks to develop the project independently.

The project uses [`react-query`](https://tanstack.com/query/v3/) to call APIs from the frontend. The endpoint functions are declared under the folder `services/api`

## Build

Build the project with `npm run build` and use the `dist` folder to publish the project

## Storybook

### Watch

Run the storybook project with `npm run storybook:watch` and open [http://localhost:9009](http://localhost:9009) with your browser to see the result.

### Build

Build the storybook with `npm run sb-tw:build` and use the `storybook-static` folder to publish the project

## Chromatic Publish

Add the chromatic project token to `env.local` and publish to [`chromatic`](https://www.chromatic.com/) using `npm run chromatic`
