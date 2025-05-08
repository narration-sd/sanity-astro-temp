import { defineConfig } from "sanity";

import { structureTool} from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  defineDocuments,
  defineLocations,
  presentationTool,
  type DocumentLocation,
} from "sanity/presentation";
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { schemaTypes } from "./schemas";

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID // || 'rbnafvhk'
   // import.meta.env.PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.SANITY_STUDIO_DATASET // || 'production'
  // import.meta.env.PUBLIC_SANITY_DATASET

const SANITY_STUDIO_PREVIEW_URL = (
  process.env.SANITY_STUDIO_PREVIEW_URL
// import.meta.env.PUBLIC_SANITY_STUDIO_PREVIEW_URL
//   || 'http://localhost:4321'
//   || 'https://sa-gnu.netlify.app'
)

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

export default defineConfig({
  name: "sanity-astro",
  title: "Sanity Astro",
  projectId: projectId,
  dataset: dataset,
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: SANITY_STUDIO_PREVIEW_URL,
      title: 'Presentation',
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/posts/:slug",
            filter: `_type == "post" && (slug.current == $slug || _id == $slug)`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "caution",
          }),
          post: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                doc
                  ? {
                    title: doc?.title || "Untitled",
                    href: `/posts/${doc.slug}`,
                  }
                  : null,
                homeLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    media(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schemaTypes,
  },
});