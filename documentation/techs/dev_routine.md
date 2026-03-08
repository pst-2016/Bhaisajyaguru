# Dev Routine

## Local Preview

Serve the site locally from the `docs` folder:

```bash
cd docs && python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**On GitHub Codespaces:** Codespaces will detect port 8000 and show a forwarded URL in the **Ports** tab. Open that URL to preview in the browser.

> Note: use `python3`, not `python` — `python` is not available in this environment.

## Save Work to Branch (without deploying)

Commit and push to the current branch to save progress:

```bash
git add .
git commit -m "feat: description"
git push origin codespaces
```

## Deploy to GitHub Pages

When ready to go live, merge into `main` and push:

```bash
git checkout main
git merge codespaces
git push
git checkout codespaces
```

> GitHub Pages serves from `main`. Changes are live at https://gz82.github.io/Bhaisajyaguru/ within a minute or two after push.
