import sanityIntegration from "@sanity/astro";
import { defineConfig } from "astro/config";
// import node from '@astrojs/node';
import netlify from '@astrojs/netlify';
import react from "@astrojs/react";
// import { loadEnv } from 'vite'

const env = {
  ...process.env,
  // ...loadEnv(process.env.NODE_ENV, process.cwd(), [
  //   'PUBLIC_SANITY_', // can add others
  // ])
}

// 'sanity' check...
// if (!(env.PUBLIC_SANITY_PROJECT_ID && env.PUBLIC_SANITY_DATASET
//   && env.PUBLIC_SANITY_API_READ_TOKEN && env.PUBLIC_SANITY_API_VERSION)) {
//   throw new Error ('You have to fill in all your /.env.development environmental variables, ' +
//       'from the example in /.env_example, before you can run this site...'
//   )
// }

// https://astro.build/config

const studioPath = '/studio'
export default defineConfig({
  integrations: [
    sanityIntegration({
      projectId: '1111aaaa', // env.PUBLIC_SANITY_PROJECT_ID,
      dataset: 'production', // env.PUBLIC_SANITY_DATASET,
      apiVersion: 'v2025-06-10', // env.PUBLIC_SANITY_API_VERSION || ,
      useCdn: false,
      // perspective: 'drafts',
      // token: env.PUBLIC_SANITY_API_READ_TOKEN,
      stega: {
        // enabled:true,
        studioUrl: studioPath, // env.PUBLIC_SANITY_STUDIO_BASE_PATH,
      },
      studioBasePath: studioPath, // env.PUBLIC_SANITY_STUDIO_BASE_PATH,
    }),
    react(),
  ],
  vite: { resolve: { alias: { lodash : 'lodash-es' } } },
  output: "server",
  // adapter: node({
  //   mode: 'standalone'
  // }),
  adapter: netlify(),
});

// n.b. pnpm run build normally, then run the result,
// using node dist/server/entry.mjs
// this will operate normally -- but show the bug!