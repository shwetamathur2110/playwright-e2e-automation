import { Page } from '@playwright/test';
import { CheckoutInformationPage } from '../pages/checkout-information.page';

export class CheckoutInformationDomain {
   private checkoutInformationPage: CheckoutInformationPage;

   constructor(private page: Page) {
      this.checkoutInformationPage = new CheckoutInformationPage(page);
   }

   async fillCheckoutInformation(
      firstName: string,
      lastName: string,
      postalCode: string,
   ) {
      await this.checkoutInformationPage.firstNameInput.fill(firstName);
      await this.checkoutInformationPage.lastNameInput.fill(lastName);
      await this.checkoutInformationPage.postalCodeInput.fill(postalCode);
   }
}
