# Viewarr
A UI to view Radarr/Sonarr entries.

## Getting Started
Create a `.env` with the following entries:

```
RADARR_URL=
RADARR_API_KEY=
SONARR_URL=
SONARR_API_KEY=
PORT=
```

Then, run install command:

`npm i`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) (or whatever port you specified in the `.env` file) with your browser to see the result.