import { test as base } from '@playwright/test';
import { LoginDomain } from '../domain/login.domain';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

type Fixtures = {
  loginDomain: LoginDomain;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  loginDomain: async ({ page }, use) => {
    await use(new LoginDomain(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const expect = test.expect;