# UNIMIND — Vue 3 migration

Vue 3 + Vite + TypeScript reconstruction of the published Wix site.

## Important fix

This version includes `vite.config.ts` with `@vitejs/plugin-vue` enabled. Without it Vite treats `.vue` files as plain JavaScript and shows an `import-analysis` parse error.

## Routes recovered from the public Wix site

- `/` — main UNIMIND page (`Про нас`)
- `/contact` — contact / application page
- `/accessibility-statement` — current page linked from the footer as `Договір оферти`
- `/privacy-policy` — privacy policy

The Wix editor screenshot also shows a generated **Inquiry Services Page**. Its public URL/content was not exposed by the public crawl and is not fabricated here.

## Structure

- `src/pages` — route-level pages
- `src/components` — reusable header, footer and homepage sections
- `src/data/content.ts` — homepage data
- `vite.config.ts` — Vue SFC support for Vite

## Run

```bash
npm install
cp .env.example .env
# Fill in the Firebase web-app values
npm run dev
```

The student table is available at `/admin/users`. Firebase Authentication handles the login, and
the authenticated email is checked against `VITE_FIREBASE_ADMIN_EMAILS`. On the free Firebase
Spark plan, data is loaded from the Google Visualization endpoint configured by
`VITE_GOOGLE_SHEET_ID` and `VITE_GOOGLE_SHEET_NAME`, so the source spreadsheet must be readable by
link.

Deploy the backend and site with the Firebase CLI:

```bash
firebase deploy --only hosting
```

If you extracted an older archive into the same folder, remove old dependencies first:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Build

```bash
npm run build
```
# unimindua
