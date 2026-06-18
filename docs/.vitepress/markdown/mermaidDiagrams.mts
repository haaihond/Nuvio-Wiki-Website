import type MarkdownIt from 'markdown-it'

export function mermaidDiagrams(md: MarkdownIt) {
  const defaultFence = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, index, options, env, self) => {
    const token = tokens[index]
    const language = token.info.trim().split(/\s+/, 1)[0].toLowerCase()

    if (language !== 'mermaid') {
      return defaultFence
        ? defaultFence(tokens, index, options, env, self)
        : self.renderToken(tokens, index, options)
    }

    return `<MermaidDiagram code="${encodeURIComponent(token.content)}" />`
  }
}
