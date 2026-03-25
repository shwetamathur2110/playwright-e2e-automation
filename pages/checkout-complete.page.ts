import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
   readonly page: Page;
   readonly checkoutCompleteTitle: Locator;
   readonly completeHeader: Locator;
   readonly completeText: Locator;
   readonly backHomeButton: Locator;

   constructor(page: Page) {
      this.page = page;
      this.checkoutCompleteTitle = page.locator('[data-test="title"]');
      this.completeHeader = page.locator('[data-test="complete-header"]');
      this.completeText = page.locator('[data-test="complete-text"]');
      this.backHomeButton = page.locator('[data-test="back-to-products"]');
   }
}
