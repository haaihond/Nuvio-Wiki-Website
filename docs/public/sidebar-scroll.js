const RETRY_DELAYS = [0, 80, 220, 500, 900]
const TOP_INSET = 14
const SIDEBAR_CLICK_SUPPRESSION_MS = 1400
const SIDEBAR_CLICK_SUPPRESSION_TTL_MS = 30000
const SUPPRESSED_PATH_STORAGE_KEY = 'nuvio-sidebar-scroll-suppressed-path'
let queueTimer
let sidebarObserver
let bodyObserver
let suppressAutoScrollUntil = 0
let suppressedAutoScrollPath
let suppressedAutoScrollTop

function isAutoScrollSuppressed() {
  const suppression = getSuppressedAutoScroll()

  return (
    Date.now() < suppressAutoScrollUntil ||
    (suppression?.path && normalizePath(location.href) === suppression.path)
  )
}

function normalizePath(value) {
  const { pathname } = new URL(value, location.href)
  return pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
}

function getSuppressedAutoScroll() {
  if (suppressedAutoScrollPath) {
    return {
      path: suppressedAutoScrollPath,
      scrollTop: suppressedAutoScrollTop
    }
  }

  const storage = getSessionStorage()
  if (!storage) return undefined

  try {
    const storedSuppression = JSON.parse(
      storage.getItem(SUPPRESSED_PATH_STORAGE_KEY) || 'null'
    )

    if (!storedSuppression?.path || storedSuppression.expiresAt < Date.now()) {
      storage.removeItem(SUPPRESSED_PATH_STORAGE_KEY)
      return undefined
    }

    return storedSuppression
  } catch {
    storage.removeItem(SUPPRESSED_PATH_STORAGE_KEY)
    return undefined
  }
}

function getSessionStorage() {
  try {
    return window.sessionStorage
  } catch {
    return undefined
  }
}

function suppressNextAutoScroll(link) {
  const sidebar = link.closest('.VPSidebar')

  suppressedAutoScrollPath = normalizePath(link.href)
  suppressedAutoScrollTop = sidebar?.scrollTop
  suppressAutoScrollUntil = Date.now() + SIDEBAR_CLICK_SUPPRESSION_MS
  const storage = getSessionStorage()

  if (storage) {
    try {
      storage.setItem(
        SUPPRESSED_PATH_STORAGE_KEY,
        JSON.stringify({
          path: suppressedAutoScrollPath,
          scrollTop: suppressedAutoScrollTop,
          expiresAt: Date.now() + SIDEBAR_CLICK_SUPPRESSION_TTL_MS
        })
      )
    } catch {
      // Storage can be unavailable in hardened browser contexts. The in-memory guard still works for SPA navigation.
    }
  }

  if (queueTimer) {
    window.clearTimeout(queueTimer)
    queueTimer = undefined
  }
}

function clearAutoScrollSuppression() {
  suppressedAutoScrollPath = undefined
  suppressedAutoScrollTop = undefined
  suppressAutoScrollUntil = 0
  const storage = getSessionStorage()

  if (!storage) return

  try {
    storage.removeItem(SUPPRESSED_PATH_STORAGE_KEY)
  } catch {
    // Ignore storage failures; clearing the in-memory state is enough for the current page.
  }
}

function scrollActiveSidebarSection() {
  if (isAutoScrollSuppressed()) {
    restoreSuppressedSidebarScroll()
    return
  }

  const sidebar = document.querySelector('.VPSidebar')
  const activeItem = sidebar?.querySelector('.VPSidebarItem.level-1.is-active')
  const section = activeItem?.closest('.VPSidebarItem.level-0')

  if (!sidebar || !section) return

  const sidebarRect = sidebar.getBoundingClientRect()
  const sectionRect = section.getBoundingClientRect()
  const navRect = document.querySelector('.VPNav')?.getBoundingClientRect()
  const desiredTop = Math.max(sidebarRect.top, navRect?.bottom ?? sidebarRect.top) + TOP_INSET
  const maxScroll = sidebar.scrollHeight - sidebar.clientHeight
  const targetTop = Math.min(
    Math.max(
      sidebar.scrollTop + sectionRect.top - desiredTop,
      0
    ),
    maxScroll
  )

  if (Math.abs(sidebar.scrollTop - targetTop) < 4) return

  sidebar.scrollTo({
    top: targetTop,
    behavior: 'auto'
  })
}

function restoreSuppressedSidebarScroll() {
  const suppression = getSuppressedAutoScroll()
  const sidebar = document.querySelector('.VPSidebar')

  if (
    !suppression ||
    !sidebar ||
    normalizePath(location.href) !== suppression.path ||
    typeof suppression.scrollTop !== 'number'
  ) return

  const maxScroll = sidebar.scrollHeight - sidebar.clientHeight
  const targetTop = Math.min(Math.max(suppression.scrollTop, 0), maxScroll)

  if (Math.abs(sidebar.scrollTop - targetTop) < 4) return

  sidebar.scrollTo({
    top: targetTop,
    behavior: 'auto'
  })
}

function observeSidebar() {
  const sidebar = document.querySelector('.VPSidebar')
  if (!sidebar || sidebar.dataset.nuvioSidebarObserved === 'true') return

  if (sidebarObserver) {
    sidebarObserver.disconnect()
  }

  sidebar.dataset.nuvioSidebarObserved = 'true'
  sidebarObserver = new MutationObserver(queueSidebarScroll)
  sidebarObserver.observe(sidebar, {
    attributes: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true
  })
}

function queueSidebarScroll() {
  if (queueTimer) {
    window.clearTimeout(queueTimer)
  }

  queueTimer = window.setTimeout(() => {
    observeSidebar()
    for (const delay of RETRY_DELAYS) {
      window.setTimeout(
        isAutoScrollSuppressed() ? restoreSuppressedSidebarScroll : scrollActiveSidebarSection,
        delay
      )
    }
  }, 40)
}

function startSidebarScrollSync() {
  queueSidebarScroll()
  observeSidebar()

  bodyObserver = new MutationObserver(() => {
    observeSidebar()
    queueSidebarScroll()
  })
  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true
  })

  for (const method of ['pushState', 'replaceState']) {
    const original = history[method]
    history[method] = function (...args) {
      const result = original.apply(this, args)
      queueSidebarScroll()
      return result
    }
  }

  window.addEventListener('popstate', queueSidebarScroll)
  window.addEventListener('hashchange', queueSidebarScroll)
  document.addEventListener('pointerdown', (event) => {
    const link = event.target.closest?.('a[href]')
    if (link && link.origin === location.origin && link.closest('.VPSidebar')) {
      suppressNextAutoScroll(link)
    }
  }, true)
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]')
    if (!link || link.origin !== location.origin) return

    if (link.closest('.VPSidebar')) {
      suppressNextAutoScroll(link)
      return
    }

    clearAutoScrollSuppression()
    queueSidebarScroll()
  }, true)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startSidebarScrollSync, { once: true })
} else {
  startSidebarScrollSync()
}
