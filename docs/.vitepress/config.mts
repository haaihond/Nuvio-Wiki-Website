import { defineConfig } from 'vitepress'
import { mermaidDiagrams } from './markdown/mermaidDiagrams.mts'
import { platformBadges } from './markdown/platformBadges.mts'

const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  title: 'Nuvio Wiki',
  titleTemplate: ':title | Nuvio Wiki',
  description: 'Community-maintained guides for installing, configuring, and using Nuvio.',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['script', { type: 'module', src: `${base}sidebar-scroll.js?v=20260617e` }],
    ['meta', { name: 'theme-color', content: '#0877f9' }],
    ['meta', { property: 'og:title', content: 'Nuvio Wiki' }],
    ['meta', { property: 'og:description', content: 'Community-maintained guides for installing, configuring, and using Nuvio.' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],

  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo.svg',
      alt: 'Nuvio Wiki'
    },
    siteTitle: 'Nuvio Wiki',

    nav: [
      { text: 'Get started', link: '/quick-start' },
      {
        text: 'Configure',
        items: [
          { text: 'Addons', link: '/addons/' },
          { text: 'Settings', link: '/settings/' },
          { text: 'Player', link: '/settings/player' },
          { text: 'Integrations', link: '/integrations/' },
          { text: 'Debrid', link: '/integrations/debrid' },
          { text: 'IMDb, MDBList, Trakt', link: '/integrations/imdb-mdblist-trakt' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'FAQ', link: '/faq' },
          { text: 'Features', link: '/features' }
        ]
      },
      { text: 'Links & Resources', link: '/official-links' }
    ],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: 'Search the wiki',
            buttonAriaLabel: 'Search the wiki'
          },
          modal: {
            displayDetails: 'Display detailed list',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No pages found for',
            footer: {
              selectText: 'to select',
              selectKeyAriaLabel: 'enter',
              navigateText: 'to navigate',
              navigateUpKeyAriaLabel: 'up arrow',
              navigateDownKeyAriaLabel: 'down arrow',
              closeText: 'to close',
              closeKeyAriaLabel: 'escape'
            }
          }
        }
      }
    },

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Welcome', link: '/' },
          { text: 'Quick Start', link: '/quick-start' },
          { text: 'Overview', link: '/overview' },
          { text: 'Features', link: '/features' },
          { text: 'Glossary', link: '/glossary' }
        ]
      },
      {
        text: 'Installation',
        collapsed: false,
        items: [
          { text: 'Choose a Platform', link: '/installation/' },
          { text: 'Android TV', link: '/installation/android-tv' },
          { text: 'Android Mobile', link: '/installation/android-mobile' },
          { text: 'iOS', link: '/installation/ios' },
          { text: 'WebOS', link: '/installation/webos' }
        ]
      },
      {
        text: 'Configure',
        collapsed: false,
        items: [
          { text: 'Addons', link: '/addons/' },
          { text: 'Settings', link: '/settings/' },
          { text: 'Player', link: '/settings/player' },
          { text: 'Profiles', link: '/settings/profiles' },
          { text: 'Collections', link: '/settings/collections' },
          { text: 'Integrations', link: '/integrations/' },
          { text: 'Debrid', link: '/integrations/debrid' },
          { text: 'IMDb, MDBList, Trakt', link: '/integrations/imdb-mdblist-trakt' }
        ]
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'FAQ', link: '/faq' },
          { text: 'Official Links', link: '/official-links' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/nuvio' },
      { icon: 'github', link: 'https://github.com/haaihond/Nuvio-Wiki-Website' }
    ],

    editLink: {
      pattern: 'https://github.com/haaihond/Nuvio-Wiki-Website/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    lastUpdated: {
      text: 'Updated',
      formatOptions: {
        dateStyle: 'medium'
      }
    },

    footer: {
      message: 'Community-maintained and not affiliated with the official Nuvio development team.',
      copyright: 'Nuvio Wiki · Created by haaihond and sappy'
    }
  },

  markdown: {
    lineNumbers: true,
    config(md) {
      mermaidDiagrams(md)
      platformBadges(md)
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  vite: {
    esbuild: {
      target: 'esnext'
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    },
    build: {
      target: 'esnext'
    }
  }
})
