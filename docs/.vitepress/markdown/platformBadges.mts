import type MarkdownIt from 'markdown-it'
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs'

const badges: Record<string, { className: string; label: string }> = {
  'android tv only': { className: 'android-tv', label: 'Android TV only' },
  'tv only': { className: 'android-tv', label: 'Android TV only' },
  'android mobile only': { className: 'android-mobile', label: 'Android Mobile only' },
  'mobile only': { className: 'mobile', label: 'Mobile only' },
  'ios only': { className: 'ios', label: 'iOS only' },
  'webos only': { className: 'webos', label: 'WebOS only' },
  'web os only': { className: 'webos', label: 'WebOS only' },
  'tizen only': { className: 'tizen', label: 'Tizen only' },
  'tv optimized': { className: 'android-tv', label: 'TV optimized' },
  'required for mobile': { className: 'mobile', label: 'Required for mobile' },
  'required for mobile only': { className: 'mobile', label: 'Required for mobile' }
}

export function platformBadges(md: MarkdownIt) {
  md.inline.ruler.after('link', 'platform-badge', (state: StateInline, silent: boolean) => {
    const match = state.src.slice(state.pos).match(/^\[([^\]\r\n]+)\]/)
    if (!match) return false

    const badge = badges[match[1].trim().toLowerCase()]
    if (!badge) return false

    if (!silent) {
      const token = state.push('html_inline', '', 0)
      token.content = `<span class="platform-badge platform-badge--${badge.className}">${badge.label}</span>`
    }

    state.pos += match[0].length
    return true
  })
}
