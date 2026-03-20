import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly openMenuButton: Locator;
  readonly inventoryItems: Locator;
  readonly productName: Locator;
  readonly addtoCartButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.locator('[data-test="title"]');
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.inventoryItems = page.locator('.inventory_item');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.addtoCartButton = page.locator('button[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');

  }
}