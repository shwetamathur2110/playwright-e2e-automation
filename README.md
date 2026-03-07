# Playwright E2E Automation

## Project Overview
This is a **Playwright-based end-to-end testing framework** for automated UI testing. The project uses the Page Object Model (POM) pattern to maintain clean separation between test logic and UI interactions.

The application used for creating this framework is [Sauce Demo](https://www.saucedemo.com/)

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
- **Example**: Custom fixture for authenticated user state to avoid login repetition

## Critical Developer Workflows

### Run Tests
```bash
npx playwright test              # Run all tests
npx playwright test --headed     # Visual mode (browser visible)
npx playwright test --debug      # Step-through debugging
npx playwright test login.spec   # Single test file
```

### Generate Reports & Trace
- HTML reports: `npx playwright show-report` (auto-generated after failure)
- Trace viewer: Enable in config for detailed interaction playback
- Screenshots/Videos: Capture on failure for CI/CD debugging

### Installation & Setup
```bash
npm install @playwright/test    # Core dependency
npx playwright install           # Download browsers
npx playwright codegen [URL]     # Auto-generate selectors (exploratory tool)
```

## Project-Specific Conventions

### Naming Conventions
- **Selectors**: Use data-testid attributes over CSS/XPath when possible (maintainability)
  ```typescript
  // GOOD: Resilient to style changes
  page.locator('[data-testid="login-button"]')
  // AVOID: Brittle to CSS refactors
  page.locator('.btn.btn-primary.mt-3')
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

## Integration Points

### Browser Targets
Support multiple browsers via config (Chromium/Firefox/WebKit):
```typescript
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
]
```

### CI/CD Integration
- Tests run headless with screenshots on failure
- Configure `baseURL` in config for environment-specific test runs
- Artifact uploads for reports and test videos

### External Dependencies
- **None by default** - Playwright is self-contained (includes browsers)
- **If adding**: Mock external APIs (no real API calls in tests)
- **Database**: Use fixtures to set up test data; avoid direct DB access when mocking is feasible

## Common Patterns & Anti-Patterns

### DO:
- ✅ Use Page Objects; test one user flow per test
- ✅ Explicit assertions with `expect()`
- ✅ Parameterized tests with `test.describe.each()` for variations
- ✅ Leverage `test.step()` for complex flows (better reporting)

### DON'T:
- ❌ Hardcoded delays (`await page.waitForTimeout(5000)`)
- ❌ Chain multiple assertions without isolation
- ❌ Test implementation details; test user-visible behavior
- ❌ Share state between tests via global variables

## Quick Reference
- **Entry point**: Playwright discovers `**/*.spec.ts` by default
- **Timeouts**: 30s default for test, 5s for element interactions (adjust in config if needed)
- **Selectors**: `page.locator()` returns a serialized reference (no DOM queries until action)
- **Parallelization**: Tests run in parallel by default; ensure test isolation
