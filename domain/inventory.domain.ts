import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';

export class InventoryDomain {
   private inventoryPage: InventoryPage;

   constructor(private page: Page) {
      this.inventoryPage = new InventoryPage(page);
   }

   async addToCart(productNames: string[]) {
      for (const productName of productNames) {
         const product = this.inventoryPage.inventoryItems.filter({
            has: this.inventoryPage.productName.filter({
               hasText: productName,
            }),
         });

         await product.locator(this.inventoryPage.addtoCartButton).click();
      }
   }

   async getProductPrice(productNames: string[]): Promise<string[]> {
      const prices: string[] = [];
      for (const name of productNames) {
         const product = this.inventoryPage.inventoryItems.filter({
            has: this.inventoryPage.productName.filter({ hasText: name }),
         });
         const priceText = await product
            .locator(this.inventoryPage.productPrice)
            .innerText();
         prices.push(priceText);
      }

      return prices;
   }
}
