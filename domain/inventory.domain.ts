import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';

export class InventoryDomain {
    private inventoryPage: InventoryPage;

    constructor(private page: Page) {
        this.inventoryPage = new InventoryPage(page);
    }

    async addToCart(productNames: string | string[]) {
        const products = Array.isArray(productNames)
            ? productNames
            : [productNames];
        for (const productName of products) {

            const product = this.inventoryPage.inventoryItems.filter({
                has: this.inventoryPage.productName.filter({ hasText: productName })
            });

            await product
                .locator(this.inventoryPage.addtoCartButton)
                .click();
        }
    }
}