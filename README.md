# Umbra-web

Site for [Umbra](https://github.com/spectrvm1337/Umbra) — a minimalist launcher for
Windows. Landing page, a theming guide with a live preview, and a light theme based
on the Paper preset.

## Stack

Vite · React · TypeScript · oxlint

## Local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npx oxlint         # lint
```

## Deploy

Pushes to `main` run `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages at <https://spectrvm1337.github.io/Umbra-web/>.

Two things in the config exist only because of Pages:

- `base: '/Umbra-web/'` in `vite.config.ts` and the matching `basename` on the
  router — the project site is served from a subpath.
- `public/404.html` — Pages has no rewrite rules, so a hard load of `/themes`
  would 404. The file parks the requested path in `sessionStorage`, bounces to the
  real entry point, and `main.tsx` restores it.

The Pages source must be set to **GitHub Actions**, not *Deploy from a branch* —
the branch source publishes the repository root, which is the unbuilt source.

## Theming preview

`/themes` applies a theme to a mock of the real UI. The preview scopes user CSS by
rewriting `:root` to a generated class, and uses the app's own selectors, so a theme
that works on the page works in the app.

Note that the app writes `--card-bg`, `--text`, `--accent`, `--card-radius`,
`--card-h`, `--card-border-w` and `--glow-size` onto `<html>` as inline styles on
every theme change. Inline styles beat a plain `:root` rule, so a custom theme needs
`!important` on exactly those seven.
