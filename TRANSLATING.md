# Translating the Nuvio Wiki

Translations are welcome. English remains the canonical source and stays in the existing `docs/` paths, so ordinary English contributions do not change.

## Directory Structure

Create one folder under `docs/` using a short language code. Use lowercase for the language and, when needed, uppercase for a regional suffix. Mirror the English file structure inside it:

```text
docs/
|-- index.md                 # English (default)
|-- quick-start.md
|-- installation/
|   `-- android-tv.md
`-- <language-code>/         # Translation
    |-- index.md
    |-- quick-start.md
    `-- installation/
        `-- android-tv.md
```

For example, a German translation would use `docs/de/`, while Brazilian Portuguese would use `docs/pt-BR/`.

## Translation Workflow

1. Create `docs/<language-code>/` on a dedicated branch.
2. Copy only the English pages you intend to translate and preserve their relative paths.
3. Translate the prose without changing commands, URLs, code examples, product names, or Markdown structure unless necessary.
4. Use relative links between translated pages. An absolute link such as `/settings/` points to English; translated absolute links must include the locale prefix, such as `/de/settings/`.
5. Keep platform labels such as `[Android TV Only]` intact. The website renders known labels as badges automatically.
6. Run `npm run docs:build` before opening a pull request.

Translation-only pull requests should not modify the English pages. If the English source needs correcting, make that a separate change so every translation can track it clearly.

## Activating a Language

Draft translation files may exist without appearing in the language menu. Register a language only when these translated navigation destinations exist:

- `index.md`
- `quick-start.md`
- `overview.md`
- `features.md`
- `glossary.md`
- `official-links.md`
- `troubleshooting.md`
- `faq.md`
- `addons/index.md`
- all pages under `installation/`, `settings/`, and `integrations/` used by the navigation

Then edit `docs/.vitepress/i18n/locales.mts`:

1. Create a `LocaleLabels` object containing translated navigation labels.
2. Add a `WikiLocale` entry to `wikiLocales` with a unique key, display label, HTML language code, and those labels.
3. Set `dir: 'rtl'` for right-to-left languages.
4. Optionally use `themeConfig` to translate additional VitePress interface text.

Use this shape without copying the placeholder values literally:

```ts
const translatedLabels: LocaleLabels = {
  ...englishLabels
  // Replace every label with its translation before activating the locale.
}

wikiLocales.push({
  key: '<language-code>',
  label: '<native language name>',
  lang: '<valid HTML language tag>',
  labels: translatedLabels
})
```

Once a second locale is registered, VitePress automatically replaces the temporary English menu with its native language selector. Language changes open the selected language's homepage, avoiding broken links when a non-navigation page has not been translated yet.

## Keeping Translations Current

- Treat the English files in `docs/` as the source of truth.
- Keep translated filenames and folders aligned with English.
- Prefer one language per pull request.
- Mention the English commit or pull request that the translation matches.
- Never use machine-generated translations without a fluent contributor reviewing them.
