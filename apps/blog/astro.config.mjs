import sanityIntegration from "@sanity/astro";
import { defineConfig } from "astro/config";
import netlify from '@astrojs/netlify';
import react from "@astrojs/react";
// import { loadEnv } from 'vite'

const env = {
  ...process.env,
  // ...loadEnv(process.env.NODE_ENV, process.cwd(), [
  //   'PUBLIC_SANITY_', // can add others
  // ])
}

const studioPath = '/studio'
export default defineConfig({
  integrations: [
    sanityIntegration({
      projectId: '1111aaaa', // env.PUBLIC_SANITY_PROJECT_ID,
      dataset: 'production', // env.PUBLIC_SANITY_DATASET,
      apiVersion: 'v2025-08-01', // env.PUBLIC_SANITY_API_VERSION || ,
      useCdn: false,

      // these are necessary to enable the embedded studio, not otherwise used
      stega: {
        studioUrl: studioPath, // env.PUBLIC_SANITY_STUDIO_BASE_PATH,
      },
      studioBasePath: studioPath, // env.PUBLIC_SANITY_STUDIO_BASE_PATH,
    }),
    react(),
  ],
  vite: { resolve: { alias: { lodash : 'lodash-es' } } },
  output: "server",
  adapter: netlify(),
});