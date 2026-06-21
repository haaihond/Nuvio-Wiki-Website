import { readdir, readFile } from 'node:fs/promises'
import { relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDir = fileURLToPath(new URL('../docs/.vitepress/dist/', import.meta.url))
const configuredBase = normalizeBase(process.env.VITEPRESS_BASE || '/')
const siteOrigin = 'https://nuvio-wiki.local'

function normalizeBase(base) {
  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nestedFiles = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? collectFiles(path) : [path]
  }))

  return nestedFiles.flat()
}

function publicFilePath(file) {
  return `/${relative(distDir, file).split(sep).join('/')}`
}

function routeForHtmlFile(file) {
  const publicPath = publicFilePath(file)
  if (publicPath === '/index.html') return '/'
  if (publicPath.endsWith('/index.html')) return publicPath.slice(0, -'index.html'.length)
  return publicPath.slice(0, -'.html'.length)
}

function withBase(route) {
  if (configuredBase === '/') return route
  return `${configuredBase.slice(0, -1)}${route}`
}

function withoutBase(pathname) {
  if (configuredBase === '/') return pathname

  const prefix = configuredBase.slice(0, -1)
  if (pathname === prefix) return '/'
  if (!pathname.startsWith(`${prefix}/`)) return null
  return pathname.slice(prefix.length) || '/'
}

function routeVariants(route) {
  if (route === '/') return ['/']
  if (route.endsWith('/')) return [route, route.slice(0, -1)]
  return [route, `${route}/`]
}

function isExternalLink(href) {
  return href.startsWith('#') || href.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(href)
}

const files = await collectFiles(distDir)
const htmlFiles = files.filter((file) => file.endsWith('.html'))
const availableTargets = new Set(files.map(publicFilePath))

for (const file of htmlFiles) {
  for (const variant of routeVariants(routeForHtmlFile(file))) {
    availableTargets.add(variant)
  }
}

const failures = []
const anchorPattern = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  const pageRoute = routeForHtmlFile(file)
  const pageUrl = new URL(withBase(pageRoute), siteOrigin)

  for (const match of html.matchAll(anchorPattern)) {
    const href = match[2].replace(/&amp;/g, '&')
    if (!href || isExternalLink(href)) continue

    const targetUrl = new URL(href, pageUrl)
    const targetPath = withoutBase(decodeURIComponent(targetUrl.pathname))

    if (targetPath === null || !availableTargets.has(targetPath)) {
      failures.push(`${pageRoute} -> ${href}`)
    }
  }
}

if (failures.length > 0) {
  const uniqueFailures = [...new Set(failures)].sort()
  console.error('\nBroken internal links found:')
  for (const failure of uniqueFailures) console.error(`  - ${failure}`)
  process.exitCode = 1
} else {
  console.log(`\u2713 checked internal links across ${htmlFiles.length} rendered pages`)
}
