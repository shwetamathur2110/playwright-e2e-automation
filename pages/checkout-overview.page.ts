import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
   readonly page: Page;
   readonly checkoutOverviewTitle: Locator;
   readonly productName: Locator;
   readonly productItemPrice: Locator;
   readonly paymentInformation: Locator;
   readonly shippingInformation: Locator;
   readonly priceTotal: Locator;
   readonly itemTotal: Locator;
   readonly tax: Locator;
   readonly total: Locator;
   readonly finishButton: Locator;

   constructor(page: Page) {
      this.page = page;
      this.checkoutOverviewTitle = page.locator(
         '[data-test="secondary-header"]',
      );
      this.finishButton = page.locator('[data-test="finish"]');
      this.productName = page.locator('[data-test="inventory-item-name"]');
      this.productItemPrice = page.locator(
         '[data-test="inventory-item-price"]',
      );
      this.paymentInformation = page.locator(
         '[data-test="payment-info-label"]',
      );
      this.shippingInformation = page.locator(
         '[data-test="shipping-info-label"]',
      );
      this.priceTotal = page.locator('[data-test="total-info-label"]');
      this.itemTotal = page.locator('[data-test="subtotal-label"]');
      this.tax = page.locator('[data-test="tax-label"]');
      this.total = page.locator('[data-test="total-label"]');
   }
}
