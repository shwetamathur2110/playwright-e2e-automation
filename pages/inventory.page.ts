import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly openMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator('[data-test="title"]');
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
  }
}