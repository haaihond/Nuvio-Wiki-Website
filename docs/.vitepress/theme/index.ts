import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import MermaidDiagram from './MermaidDiagram.vue'
import P2PGenerator from './components/P2PGenerator.vue'
import SiteFooter from './SiteFooter.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-bottom': () => h(SiteFooter)
  }),
  enhanceApp({ app }) {
    app.component('MermaidDiagram', MermaidDiagram)
    app.component('P2PGenerator', P2PGenerator)
  }
}
