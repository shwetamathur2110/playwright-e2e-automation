# Playwright E2E Automation Framework

![Playwright Tests](https://github.com/shwetamathur2110/playwright-e2e-automation/actions/workflows/playwright.yml/badge.svg)

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [CI/CD & GitHub Actions](#cicd--github-actions)
- [Quick Start](#quick-start)
- [Test Status](#test-status)
- [Architecture & Patterns](#architecture--patterns)
- [Conventions & Best Practices](#conventions--best-practices)

## Project Overview

This is a **Playwright-based end-to-end testing framework** for automated UI and API testing. The project uses the Page Object Model (POM) pattern to maintain clean separation between test logic and UI interactions.

The application used for creating this framework is [Sauce Demo](https://www.saucedemo.com/)

## Tech Stack

- Playwright
- TypeScript
- Node.js
- npm

## CI/CD & GitHub Actions

This project is integrated with **GitHub Actions** to automatically execute Playwright tests in a CI pipeline.

### Workflow Triggers

- **Push** to `main` / `master`
- **Pull Requests**
- **Manual execution** via `workflow_dispatch` (with optional test tag input default to `@smoke`)

### CI Capabilities

- Headless test execution
- Screenshots and videos captured on failure
- HTML reports generated and uploaded as artifacts
- Tag-based test execution for selective runs (e.g. smoke, regression)
- API tests executed with secure API key via GitHub Secrets


### Benefits

- Early detection of UI regressions
- Consistent test execution across environments
- Easy manual test runs without local setup

## API Testing

This framework also includes API automation tests using Playwright's built-in request client.

### API Source

- ReqRes public API is used for demonstration: https://reqres.in
- Provides sample endpoints for GET, POST, and authentication scenarios

### Covered Scenarios

- GET users (pagination validation)
- POST create user
- Negative login scenario (error handling validation)

### Authentication

Some endpoints require an API key.
The key is passed securely using environment variables:

- Local: `.env`
- CI/CD: GitHub Secrets

Example:

```ts
headers: {
  'x-api-key': process.env.REQRES_API_KEY
}
```

## Quick Start

### Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/shwetamathur2110/playwright-e2e-automation.git
cd playwright-e2e-automation
```

2. Install dependencies

```bash
npm install
```

3. Install Playwright browsers

```bash
npx playwright install
```

### Run Tests

```bash
npx playwright test              # Run all tests
npx playwright test --headed     # Visual mode (browser visible)
npx playwright test --debug      # Step-through debugging
npx playwright test login.spec   # Single test file
```

### Generate Reports & Trace

- HTML reports: `npx playwright show-report`
- Trace viewer: Enabled in config on failure for debugging
- Screenshots/Videos: Capture on failure debugging

## Test Status

| Layer          | Status |
| -------------- | ------ |
| UI Tests       | ✔      |
| API Tests      | ✔      |
| CI/CD Pipeline | ✔      |

## Architecture & Patterns

### Page Object Model (POM) Structure

- **Location**: `pages/` (recommended)
- **Pattern**: One class per page/feature with web element locators
- **Example structure**:
   ```
   pages/login.page.ts
   - selectors: private properties with CSS/XPath locators
   - methods: public functions like login(), fillEmail(), clickSubmit()
   - use page.locator() for modern Playwright patterns
   ```
- **Benefit**: Tests become readable and UI changes localized to one file

### Domain Structure

- **Location**: `domain/`
- **Pattern**: domain wrap POM classes to implement higher-level flows
- **Example structure**:
   ```
   domain/login.domain.ts
   - methods: public functions like login(), fillEmail(), clickSubmit()
   - use locators from POM files
   ```
- **Benefit**: Tests become more readable and easier to scale

### Test Organization

- **Location**: `tests/ui/` or `tests/api/` directories
- **Naming**: `[feature].spec.ts` (e.g., `login.spec.ts`, `checkout-flow.spec.ts`)
- **Structure**: Use `test.describe()` for grouping related scenarios; one assertion focus per test
- **Setup**: Leverage `test.beforeEach()` for test initialization (browser state, navigation)

### Configuration & Fixtures

- **Config**: `playwright.config.ts` (root) - parallelization, retry logic, timeout settings
- **Fixtures**: Create reusable test utilities in `tests/fixtures/` for auth, data setup, common object creation etc.

### Environment Configuration

- This project uses the publicly available [Sauce Demo](https://www.saucedemo.com/) application for UI tests (no configuration required)
- API tests uses [ReqRes](https://reqres.in/) public API
   - API key is required and managed via:
   - `.env` for local runs
   - GitHub Secrets for CI/CD

## Conventions & Best Practices

### Selectors & Locators

- **Selectors**: Use data-testid attributes for maintainability
   ```typescript
   // GOOD: Resilient to style changes
   page.locator('[data-testid="login-button"]');
   // AVOID: Brittle to CSS refactors
   page.locator('.btn.btn-primary.mt-3');
   ```
- **Locator variables**: kebab-case or camelCase for clarity (e.g., `submitButton`, `error-message`)

### Test Data & Fixtures

- **Test Data**: Store in `tests/data/` (JSON files or TypeScript objects)
- **No Hardcoding**: Use fixtures or environment variables for URLs, credentials
- **Isolation**: Each test should be independent; avoid test interdependencies

### Assertions

- **Style**: Use modern Playwright assertions (`expect(locator).toBeVisible()`)
- **Wait implicitly**: Playwright waits for elements; no manual `waitFor*` unless timeouts exceed defaults
- **Meaningful messages**: Include context in assertions for CI logs

### Error Handling

- **Failure Recovery**: Tests fail fast; no silent catches - let failures surface clearly
- **Debugging**: Use `page.pause()` in tests (removed after fixing), or `--debug` flag
- **Flakiness**: Address via explicit waits, network mocking, or test isolation improvements
