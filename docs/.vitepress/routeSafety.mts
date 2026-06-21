import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { legacyRouteRedirects, siteRoutes } from './routes.mts'

const docsDir = fileURLToPath(new URL('..', import.meta.url))

function sourceFileForRoute(route: string) {
  if (route === '/') return join(docsDir, 'index.md')

  const relativeRoute = route.replace(/^\//, '')
  return route.endsWith('/')
    ? join(docsDir, relativeRoute, 'index.md')
    : join(docsDir, `${relativeRoute}.md`)
}

export function validateSiteRoutes() {
  const missing = Object.entries(siteRoutes).filter(([, route]) => !existsSync(sourceFileForRoute(route)))

  if (missing.length > 0) {
    const details = missing.map(([name, route]) => `  - ${name}: ${route}`).join('\n')
    throw new Error(`Site routes point to missing documents:\n${details}`)
  }
}

function withConfiguredBase(route: string, base: string) {
  if (base === '/') return route
  return `${base.replace(/\/$/, '')}${route}`
}

function redirectDocument(destination: string) {
  const encodedDestination = JSON.stringify(destination)
  const escapedDestination = destination.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0; url=${escapedDestination}">
    <link rel="canonical" href="${escapedDestination}">
    <title>Page moved | Nuvio Wiki</title>
    <script>location.replace(${encodedDestination} + location.search + location.hash)</script>
  </head>
  <body>
    <p>This page moved to <a href="${escapedDestination}">${escapedDestination}</a>.</p>
  </body>
</html>
`
}

export async function writeLegacyRedirects(outDir: string, base: string) {
  for (const [from, to] of Object.entries(legacyRouteRedirects)) {
    const relativePath = from.replace(/^\/+|\/+$/g, '')
    const document = redirectDocument(withConfiguredBase(to, base))
    const htmlFile = join(outDir, `${relativePath}.html`)
    const indexFile = join(outDir, relativePath, 'index.html')

    await mkdir(join(outDir, relativePath), { recursive: true })
    await writeFile(htmlFile, document, 'utf8')
    await writeFile(indexFile, document, 'utf8')
  }
}
