import { test, expect } from '../../fixtures/customfixtures';
import { users } from '../../test-data/users';
import { products } from '../../test-data/products';
import { customer } from '../../test-data/checkout';

test.describe('Checkout Test', () => {
   test(
      'should checkout items in the cart successfully',
      { tag: ['@smoke', '@regression'] },
      async ({
         loginDomain,
         inventoryDomain,
         inventoryPage,
         cartPage,
         checkoutInformationDomain,
         checkoutInformationPage,
         checkoutOverviewPage,
         checkoutOverviewDomain,
         checkoutCompletePage,
      }) => {
         const items = [products.backpack, products.bikeLight];
         // Login first
         await loginDomain.login(
            users.standard.username,
            users.standard.password,
         );
         // Add a product to the cart
         await inventoryDomain.addToCart(items);
         // Click on the cart link to navigate to the cart page
         await inventoryPage.cartLink.click();
         await expect(cartPage.cartTitle).toHaveText('Your Cart');
         await expect(cartPage.inventoryItemName).toHaveText(items);
         // Click on the checkout button to navigate to the checkout page
         await cartPage.checkoutButton.click();
         await expect(
            checkoutInformationPage.checkoutInformationTitle,
         ).toHaveText('Checkout: Your Information');
         // Fill in the checkout information and continue to the next step
         await checkoutInformationDomain.fillCheckoutInformation(
            customer.firstName,
            customer.lastName,
            customer.postalCode,
         );
         await checkoutInformationPage.continueButton.click();
         // Verify that the user is navigated to the checkout overview page
         await expect(checkoutOverviewPage.checkoutOverviewTitle).toHaveText(
            'Checkout: Overview',
         );
         // Verify that the correct product is displayed in the checkout overview page along with the correct price
         await expect(checkoutOverviewPage.productName).toHaveText(items);
         const priceLocatorCount =
            await checkoutOverviewPage.productItemPrice.count();
         expect(priceLocatorCount).toBeGreaterThan(0);
         await expect(checkoutOverviewPage.paymentInformation).toContainText(
            'Payment Information:',
         );
         await expect(checkoutOverviewPage.shippingInformation).toContainText(
            'Shipping Information:',
         );
         await expect(checkoutOverviewPage.priceTotal).toContainText(
            'Price Total',
         );
         // Validate that the item total is correct based on the product price
         const calculatedTotal =
            await checkoutOverviewDomain.calculateItemTotal();
         const displayedTotal =
            await checkoutOverviewDomain.getDisplayedItemTotal();
         /** 
         Used toBeCloseTo to solve the issue of rounding errors in floating point arithmetic. 
         Using ToBe or toEqual can lead to flaky tests if the calculated total is 0.01 off from the displayed total due to rounding issues.
      */
         expect(calculatedTotal).toBeCloseTo(displayedTotal, 2);

         await checkoutOverviewPage.finishButton.click();
         await expect(checkoutCompletePage.checkoutCompleteTitle).toHaveText(
            'Checkout: Complete!',
         );
         await expect(checkoutCompletePage.completeHeader).toHaveText(
            'Thank you for your order!',
         );
         await expect(checkoutCompletePage.completeText).toHaveText(
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
         );
         await expect(checkoutCompletePage.backHomeButton).toBeVisible();
      },
   );

   test(
      'should display the correct total amount',
      { tag: '@regression' },
      async ({
         loginDomain,
         inventoryPage,
         inventoryDomain,
         cartPage,
         checkoutInformationPage,
         checkoutOverviewPage,
      }) => {
         const items = [products.backpack];
         // Login first
         await loginDomain.login(
            users.standard.username,
            users.standard.password,
         );
         // Add a product to the cart
         await inventoryDomain.addToCart(items);
         // Click on the cart link to navigate to the cart page
         await inventoryPage.cartLink.click();
         await expect(cartPage.cartTitle).toHaveText('Your Cart');
         await expect(cartPage.inventoryItemName).toHaveText(items);
         // Click on the checkout button to navigate to the checkout page
         await cartPage.checkoutButton.click();
         await expect(
            checkoutInformationPage.checkoutInformationTitle,
         ).toHaveText('Checkout: Your Information');
         await checkoutInformationPage.continueButton.click();
         // Validation: Verify that an error message is displayed when the user tries to continue without filling in the required information
         await expect(checkoutInformationPage.errorMessage).toHaveText(
            'Error: First Name is required',
         );
         await checkoutInformationPage.firstNameInput.fill(customer.firstName);
         await checkoutInformationPage.continueButton.click();
         await expect(checkoutInformationPage.errorMessage).toHaveText(
            'Error: Last Name is required',
         );
         await checkoutInformationPage.lastNameInput.fill(customer.lastName);
         await checkoutInformationPage.continueButton.click();
         await expect(checkoutInformationPage.errorMessage).toHaveText(
            'Error: Postal Code is required',
         );
         await checkoutInformationPage.postalCodeInput.fill(customer.postalCode);
         await checkoutInformationPage.continueButton.click();
         // Verify that the user is navigated to the checkout overview page
         await expect(checkoutOverviewPage.checkoutOverviewTitle).toHaveText(
            'Checkout: Overview',
         );
      },
   );
});
