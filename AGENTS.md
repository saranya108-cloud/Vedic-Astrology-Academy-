# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **zero-dependency static single-page app**. The entire product lives in `index.html` (inline HTML/CSS/JS). There is no backend, database, package manager, build step, linter, or automated test suite.

### Running the app (dev)
Serve the repo root over HTTP and open `index.html`:

```bash
python3 -m http.server 8000
# → http://localhost:8000/index.html
```

Opening the file directly via `file://` also works (per `README.md`), but a static HTTP server is preferred for browser automation / consistent behavior.

### Build / lint / test
- **Build:** none — the app is served as-is.
- **Lint:** none configured.
- **Test:** no automated tests in the repo. `USER_TESTING_REPORT.md` documents manual browser (Playwright) testing done outside the repo; there is no Playwright config committed. Verify changes by loading the served page and exercising the chart + modules + quizzes.

### Notes
- No dependencies to install; there is nothing to `npm install` / `pip install`.
- All content (nakshatras, yogas, grahas, etc.) is hardcoded in JS arrays inside `index.html`.
