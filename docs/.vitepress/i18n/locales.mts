import type { DefaultTheme } from 'vitepress'

export interface LocaleLabels {
  getStarted: string
  configure: string
  help: string
  linksAndResources: string
  addons: string
  settings: string
  player: string
  integrations: string
  debrid: string
  metadataTracking: string
  troubleshooting: string
  faq: string
  features: string
  gettingStarted: string
  welcome: string
  quickStart: string
  overview: string
  glossary: string
  installation: string
  choosePlatform: string
  androidTV: string
  androidMobile: string
  ios: string
  webos: string
  profiles: string
  collections: string
  officialLinks: string
  helpTranslate: string
}

export interface WikiLocale {
  key: string
  label: string
  lang: string
  dir?: 'ltr' | 'rtl'
  labels: LocaleLabels
  themeConfig?: Partial<DefaultTheme.Config>
}

export const englishLabels: LocaleLabels = {
  getStarted: 'Get started',
  configure: 'Configure',
  help: 'Help',
  linksAndResources: 'Links & Resources',
  addons: 'Addons',
  settings: 'Settings',
  player: 'Player',
  integrations: 'Integrations',
  debrid: 'Debrid',
  metadataTracking: 'TMDb, MDBList, Trakt',
  troubleshooting: 'Troubleshooting',
  faq: 'FAQ',
  features: 'Features',
  gettingStarted: 'Getting Started',
  welcome: 'Welcome',
  quickStart: 'Quick Start',
  overview: 'Overview',
  glossary: 'Glossary',
  installation: 'Installation',
  choosePlatform: 'Choose a Platform',
  androidTV: 'Android TV',
  androidMobile: 'Android Mobile',
  ios: 'iOS',
  webos: 'WebOS',
  profiles: 'Profiles',
  collections: 'Collections',
  officialLinks: 'Official Links',
  helpTranslate: 'Help translate'
}

export const dutchLabels: LocaleLabels = {
  getStarted: 'Aan de slag',
  configure: 'Configureren',
  help: 'Hulp',
  linksAndResources: 'Links & Bronnen',
  addons: 'Add-ons',
  settings: 'Instellingen',
  player: 'Speler',
  integrations: 'Integraties',
  debrid: 'Debrid',
  metadataTracking: 'TMDb, MDBList, Trakt',
  troubleshooting: 'Probleemoplossing',
  faq: 'FAQ',
  features: 'Functies',
  gettingStarted: 'Aan de slag',
  welcome: 'Welkom',
  quickStart: 'Snelstartgids',
  overview: 'Overzicht',
  glossary: 'Begrippenlijst',
  installation: 'Installatie',
  choosePlatform: 'Kies een platform',
  androidTV: 'Android TV',
  androidMobile: 'Android Mobiel',
  ios: 'iOS',
  webos: 'WebOS',
  profiles: 'Profielen',
  collections: 'Collecties',
  officialLinks: 'Officiële links',
  helpTranslate: 'Help vertalen'
}

// Register a translation only after its docs/<key>/index.md and navigation pages exist.
export const wikiLocales: WikiLocale[] = [
  {
    key: 'root',
    label: 'English',
    lang: 'en-US',
    labels: englishLabels
  },
  {
    key: 'nl',
    label: 'Nederlands',
    lang: 'nl-NL',
    labels: dutchLabels
  }
]

export const englishLocale = wikiLocales[0]

export function localeRoot(locale: WikiLocale) {
  return locale.key === 'root' ? '/' : `/${locale.key}/`
}

export function localeLink(locale: WikiLocale, path: string) {
  return locale.key === 'root' ? path : `/${locale.key}${path}`
}
