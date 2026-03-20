import { test as base } from '@playwright/test';
import { LoginDomain } from '../domain/login.domain';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';
import { InventoryDomain } from '../domain/inventory.domain';
import { CartPage } from '../pages/cart.page';
import { CartDomain } from '../domain/cart.domain';

type Fixtures = {
  loginDomain: LoginDomain;
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  inventoryDomain: InventoryDomain;
  cartPage: CartPage;
  cartDomain: CartDomain;
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
  inventoryDomain: async ({ page }, use) => {
    await use(new InventoryDomain(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  cartDomain: async ({ page }, use) => {
    await use(new CartDomain(page));
  }

});

export const expect = test.expect;