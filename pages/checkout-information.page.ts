import { Locator, Page } from '@playwright/test';

export class CheckoutInformationPage {
   readonly page: Page;
   readonly checkoutInformationTitle: Locator;
   readonly firstNameInput: Locator;
   readonly lastNameInput: Locator;
   readonly postalCodeInput: Locator;
   readonly continueButton: Locator;

   constructor(page: Page) {
      this.page = page;
      this.checkoutInformationTitle = page.locator(
         '[data-test="secondary-header"]',
      );
      this.firstNameInput = page.locator('[data-test="firstName"]');
      this.lastNameInput = page.locator('[data-test="lastName"]');
      this.postalCodeInput = page.locator('[data-test="postalCode"]');
      this.continueButton = page.locator('[data-test="continue"]');
   }
}
