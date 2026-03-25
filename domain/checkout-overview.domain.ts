import { Page } from '@playwright/test';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';

export class CheckoutOverviewDomain {
   private checkoutOverviewPage: CheckoutOverviewPage;

   constructor(private page: Page) {
      this.checkoutOverviewPage = new CheckoutOverviewPage(page);
   }

   /**
    * Calculates the sum of all item prices displayed on checkout step two
    */
   async calculateItemTotal(): Promise<number> {
      const price = await this.checkoutOverviewPage.productItemPrice;
      const count = await price.count();
      let total = 0;
      for (let i = 0; i < count; i++) {
         const priceText = await price.nth(i).innerText();
         if (!priceText) {
            throw new Error(`Price text not found for item index ${i}`);
         }
         total += parseFloat(priceText.replace('$', '').trim());
      }
      return total;
   }

   /**
    * Gets the Item total value displayed on the page
    */
   async getDisplayedItemTotal(): Promise<number> {
      const itemTotalText =
         await this.checkoutOverviewPage.itemTotal.textContent();
      if (!itemTotalText) {
         throw new Error('Item total text not found');
      }
      return parseFloat(itemTotalText.replace('Item total: $', '').trim());
   }
}
