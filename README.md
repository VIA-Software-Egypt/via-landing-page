# VIA Software Egypt

Angular 22 implementation of the supplied Burgundy Editorial design, with the original 3D branding and project imagery.

## Run locally

Use Node.js 24 and npm 10 or later.

```sh
npm ci
npm start
```

Open http://localhost:4200. The home page is `/`; project notes are at `/news`.

## Build and test

```sh
npm run build
npm test -- --watch=false
```

The existing Angular SSR configuration is preserved. The build prerenders both pages into `dist/via-landing/browser` and emits the Node server into `dist/via-landing/server`. To run the production server:

```sh
npm run serve:ssr:via-landing
```

The production preview runs on port 4000. Before deploying the Node server to a custom domain, add that hostname to `security.allowedHosts` in `angular.json` and rebuild.

## Implementation

- Layout, colors, copy and project order follow the supplied desktop and 390px mobile references.
- The home and newsroom pages are lazy-loaded Angular routes, with shared navigation, contact section and project dialog.
- Portfolio filters use signals. The native modal provides keyboard focus containment, Escape/backdrop closing, focus restoration and scroll locking.
- Motion includes a floating 3D ring, section reveals, mobile navigation and hover interactions. First-viewport content stays visible during hydration; offscreen reveals are prepared before entry and skip animation after fast swipes. The ring pauses offscreen and in background tabs. Reduced-motion preferences disable these effects.
- Original full-resolution assets are in `public/assets`. Responsive WebP ring images, a lossless WebP logo and smaller portfolio previews reduce mobile transfers. Project galleries use the original screenshots.
- Edit project content in `src/app/projects.ts`, layouts in `src/app/pages`, shared sections in `src/app/shared`, and the design styles in `src/styles.css`.
- Contact cards remain **Coming soon**, matching the supplied design. Add real destinations when they are available.

## Verification

Production build and eight behavior tests pass, including regression tests for initial-paint flashing, reveal timing, fast swipes and changing Reduce Motion. Both pages were reviewed in the browser at 320, 360, 390, 768, 1024 and 1440px widths, with no horizontal page overflow. Mobile navigation, all filters, project details, Escape/focus restoration, newsroom navigation and page-specific anchor links were checked. All portfolio images loaded successfully.

Mobile motion was checked in responsive desktop-browser viewports, including 430px. Physical iPhone/Safari performance has not been measured. The mobile modal uses stable/dynamic viewport sizing and avoids an animated backdrop blur.

Local screenshots and responsive measurements are saved in the ignored `qa/` directory. Design downloads and reference archives are also ignored.
