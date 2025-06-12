import sanityIntegration from "@sanity/astro";
import { defineConfig } from "astro/config";
import netlifyAdapter from '@astrojs/netlify';
import react from "@astrojs/react";
import { loadEnv } from 'vite'

const env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV, process.cwd(), [
    'PUBLIC_SANITY_', // can add others
  ])}

// 'sanity' check...
if (!(env.PUBLIC_SANITY_PROJECT_ID && env.PUBLIC_SANITY_DATASET
  && env.PUBLIC_SANITY_API_READ_TOKEN && env.PUBLIC_SANITY_API_VERSION)) {
  throw new Error ('You have to fill in all your /.env.development environmental variables, ' +
      'from the example in /.env_example, before you can run this site...'
  )
}

let perspective = 'preview'
let useCdn = false
let deployConfig = {};

if (env.PUBLIC_SANITY_PREVIEW_SSR === "true") {
  perspective = 'drafts'
  useCdn = false
  deployConfig = {
    output: "server",
    adapter: netlifyAdapter(),
    stega: { studioUrl: deployConfig.studioUrl },
    studioBasePath: env.PUBLIC_SANITY_STUDIO_BASE_PATH,
  };
  console.log("Configuring with Netlify adapter as SSR for visual editing");
} else {
  perspective = 'published'
  useCdn = true
  deployConfig = {
    output: "static",
    adapter: undefined, // these undefines turn off Presentation
    stega: undefined,
    studioBasePath: undefined,
  };
  console.log("Configuring as Astro native SSG for public website");
}

// https://astro.build/config
const finalConfig = defineConfig({
  integrations: [
    sanityIntegration({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      apiVersion: env.PUBLIC_SANITY_API_VERSION,
      useCdn: useCdn,
      perspective: perspective,
      token: env.PUBLIC_SANITY_API_READ_TOKEN,
      stega: deployConfig.stega,
      studioBasePath: deployConfig.studioBasePath,
    }),
    react(),
  ],
  output: deployConfig.output,
  adapter: deployConfig.adapter,
  vite: { resolve: { alias: { lodash : 'lodash-es' } } },
});

export default finalConfig;