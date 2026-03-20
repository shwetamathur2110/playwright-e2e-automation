import { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page
    readonly cartTitle: Locator;
    readonly inventoryItemName: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTitle = page.locator('[data-test="title"]');
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
        this.removeButton = page.locator('[data-test="cart-list"] button[data-test^="remove"]');
    }
}