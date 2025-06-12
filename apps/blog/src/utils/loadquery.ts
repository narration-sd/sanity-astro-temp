// load-query.ts
import {type QueryParams} from 'sanity'
import {sanityClient} from 'sanity:client'

const ssrServer = import.meta.env.PUBLIC_SANITY_PREVIEW_SSR === 'true'
const visualEditingEnabled = ssrServer && import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true'
const token = import.meta.env.PUBLIC_SANITY_API_READ_TOKEN

export async function loadQuery<QueryResponse>({
                                                 query,
                                                 params,
                                               }: {
  query: string
  params?: QueryParams
}) {
  if (visualEditingEnabled && !token) {
    throw new Error(
      'The `PUBLIC_SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.',
    )
  }

  const perspective = visualEditingEnabled ? 'previews' : 'published'

  const {result, resultSourceMap} = await sanityClient.fetch<QueryResponse>(query, params ?? {}, {
    filterResponse: false,
    perspective: perspective,
    resultSourceMap: visualEditingEnabled ? 'withKeyArraySelector' : false,
    stega: visualEditingEnabled,
      ...(visualEditingEnabled ? {token} : {}),
    useCdn: !ssrServer,
  })

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  }
}