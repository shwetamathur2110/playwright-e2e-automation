import { test as base } from '@playwright/test';
import { LoginDomain } from '../domain/login.domain';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';
import { InventoryDomain } from '../domain/inventory.domain';
import { CartPage } from '../pages/cart.page';
import { CartDomain } from '../domain/cart.domain';
import { CheckoutInformationDomain } from '../domain/checkout-information.domain';
import { CheckoutInformationPage } from '../pages/checkout-information.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { CheckoutOverviewDomain } from '../domain/checkout-overview.domain';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';

type Fixtures = {
   loginDomain: LoginDomain;
   inventoryPage: InventoryPage;
   loginPage: LoginPage;
   inventoryDomain: InventoryDomain;
   cartPage: CartPage;
   cartDomain: CartDomain;
   checkoutInformationDomain: CheckoutInformationDomain;
   checkoutInformationPage: CheckoutInformationPage;
   checkoutOverviewPage: CheckoutOverviewPage;
   checkoutOverviewDomain: CheckoutOverviewDomain;
   checkoutCompletePage: CheckoutCompletePage;
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
   },
   checkoutInformationDomain: async ({ page }, use) => {
      await use(new CheckoutInformationDomain(page));
   },
   checkoutInformationPage: async ({ page }, use) => {
      await use(new CheckoutInformationPage(page));
   },
   checkoutOverviewPage: async ({ page }, use) => {
      await use(new CheckoutOverviewPage(page));
   },
   checkoutOverviewDomain: async ({ page }, use) => {
      await use(new CheckoutOverviewDomain(page));
   },
   checkoutCompletePage: async ({ page }, use) => {
      await use(new CheckoutCompletePage(page));
   },
});

export const expect = test.expect;
