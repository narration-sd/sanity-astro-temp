import { defineConfig } from "sanity";

import { structureTool} from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  presentationTool,
  type DocumentLocation,
} from "sanity/presentation";
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { schemaTypes } from "./schemas";
import { resolve } from "./src/utils/resolve.ts";

export const projectId = typeof process !== 'undefined'
  ? process.env.SANITY_STUDIO_PROJECT_ID
  : import.meta.env.PUBLIC_SANITY_PROJECT_ID

export const dataset =  typeof process !== 'undefined'
  ? process.env.SANITY_STUDIO_DATASET
  : import.meta.env.PUBLIC_SANITY_DATASET

const SANITY_STUDIO_PREVIEW_URL = typeof process !== 'undefined'
  ? process.env.SANITY_STUDIO_PREVIEW_URL
  : import.meta.env.PUBLIC_SANITY_STUDIO_PREVIEW_URL

const ssrServer = typeof process !== 'undefined'
  ? process.env.SANITY_STUDIO_PREVIEW_SSR
  : import.meta.env.PUBLIC_SANITY_PREVIEW_SSR

const plugins = ssrServer
  ? [
      structureTool(),
      visionTool(),
      presentationTool({
        previewUrl: SANITY_STUDIO_PREVIEW_URL,
        title: 'Presentation',
        resolve: resolve,
      }),
      media(),
      unsplashImageAsset(),
    ]
  : undefined

export default defineConfig({
  name: "sanity-astro",
  title: "Sanity Astro",
  projectId: projectId,
  dataset: dataset,
  plugins: plugins,
  schema: {
    types: schemaTypes,
  },
});