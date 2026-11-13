# VIA landing page foundation

Setup only. The root component deliberately renders nothing. No pages,
sections, branding, colors, fonts, navigation, sample content or UI have been built.

## Stack

- Angular 20.3, using the locally installed Angular CLI 20.3.3.
- Strict TypeScript, standalone components, zoneless change detection.
- Tailwind CSS 4 via PostCSS for future responsive styling.
- Lucide Angular for SVG icons. Import individual icons where used, not the entire catalog.
- Static prerendering and client hydration. Deploy output: `dist/via-landing/browser`.

Angular was chosen to reuse the existing local toolchain. This is a project
choice, not a claim that Angular is the smallest possible landing-page framework.
No additional global tools are required.

## Requirements and commands

The existing Node 22.19.0 and npm 10.9.3 fit this Angular 20 setup.
Run in this directory:

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run build
npm.cmd start
```

The dev server uses http://127.0.0.1:4200. A blank page is intentional.
After the first successful install, keep `package-lock.json` and use `npm.cmd ci`
on other machines. Dependency ranges in `package.json` are not a lockfile.

## Source organization

- `src/app/app.ts`: empty application root.
- `src/app/app.config.ts`: application providers.
- `src/app/app.config.server.ts` and `app.routes.server.ts`: build-time prerendering.
- `src/app/shared/`: reserved for future shared components.
- `src/styles.css`: Tailwind import only; no design decisions yet.
- `src/assets/images/` and `fonts/`: future assets imported through the build.
- `public/icons/`: future files copied unchanged to the output.

Language/direction, brand assets, page content, social metadata, canonical URL,
and visual design are pending the UI phase. The current `lang="en"` is a
scaffold default, not an agreed language requirement.

## Verification status - 2026-11-11

The CLI scaffold was generated successfully and the project configuration was
checked locally. Dependency installation failed because the execution environment
could not resolve `registry.npmjs.org` (`ENOTFOUND`). Consequently no lockfile,
successful Angular build, browser verification, or verified installed icon package
is claimed. Run the commands above once npm registry access is available.

Nothing has been published.

## References

- https://v20.angular.dev/guide/tailwind
- https://v20.angular.dev/guide/ssr
- https://v0.lucide.dev/guide/packages/lucide-angular
