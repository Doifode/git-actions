# GitHub Actions: Copy‑Paste Snippets for LinkedIn 🚀

Use these short, skimmable snippets to teach (or learn) GitHub Actions from zero → advanced. Each block includes a one‑liner description for easy posting.

---

## 1) Hello CI — minimal workflow
One job, one step. Triggers on any push.
```yaml
name: CI - Hello
on: [push]
jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - run: echo "CI triggered on $GITHUB_REF by $GITHUB_ACTOR"
```

---

## 2) Node.js CI with cache
Checkout, setup Node, cache npm, install, test.
```yaml
name: CI - Node
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test -- --ci
```

---

## 3) Matrix builds (multi-OS, multi-version)
Test across OS and Node versions in parallel.
```yaml
name: CI - Matrix
on: [push]
jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [18, 20]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm run build
```

---

## 4) Deploy with environments and secrets
Manual trigger; protected `production` env; uses secrets.
```yaml
name: Deploy
on: { workflow_dispatch: {} }
jobs:
  deploy:
    environment: production
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run deploy script
        run: ./deploy.sh
        env:
          API_KEY: ${{ secrets.PROD_API_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 5) Reusable workflow (DRY)
Call this from other repos/workflows via `workflow_call`.
```yaml
# .github/workflows/reusable-tests.yml
name: Reusable Tests
on:
  workflow_call:
    inputs:
      node-version:
        type: string
        default: '20'
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci && npm test
```

---

## 6) Conditional execution (smart runs)
Only run on main; only deploy on tags.
```yaml
name: Smart CI
on: [push]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Test on main only
        if: github.ref == 'refs/heads/main'
        run: npm test -- --coverage
      - name: Deploy on tags only
        if: startsWith(github.ref, 'refs/tags/')
        run: npm run deploy
```

---

## 7) Scheduled workflow (cron)
Nightly job at 01:00 UTC.
```yaml
name: Nightly
on:
  schedule:
    - cron: '0 1 * * *'
jobs:
  nightly:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Nightly maintenance job"
```

---

## 8) Slack notification on failure
Post a message when a job fails.
```yaml
name: Notify
on: [push]
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Simulate failure
        run: exit 1 || true
      - name: Notify Slack on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
          text: "Build failed: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

---

## 9) Build and push Docker image
Tag image with commit SHA and push to GHCR.
```yaml
name: Docker Build
on: [push]
jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
```

---

## 10) Full CI template
Drop-in CI for many JS projects.
```yaml
name: CI
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm test -- --ci

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
```

---

Tip: place workflows under `.github/workflows/*.yml`. Add badges to your README for visibility. Happy automating! ✨
