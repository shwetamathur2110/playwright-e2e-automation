import { test, expect } from '../../fixtures/customfixtures';
import { users } from '../../test-data/users';

test.describe('Login Test', () => {
   test(
      'should successfully login with valid credentials',
      { tag: ['@smoke', '@regression'] },
      async ({ loginDomain, inventoryPage }) => {
         await loginDomain.login(
            users.standard.username,
            users.standard.password,
         );
         await expect(inventoryPage.productsTitle).toBeVisible();
         await expect(inventoryPage.productsTitle).toContainText('Products');
         await expect(inventoryPage.openMenuButton).toBeVisible();
      },
   );

   test(
      'should show error message with invalid credentials',
      { tag: '@regression' },
      async ({ loginDomain, loginPage }) => {
         await loginDomain.login(
            users.invalid.username,
            users.invalid.password,
         );
         const errorMessage = loginPage.errorMessage;
         await expect(errorMessage).toBeVisible();
         await expect(errorMessage).toContainText(
            'Username and password do not match any user in this service',
         );
      },
   );

   test(
      'should show error message when locked-out user tries to login',
      { tag: '@regression' },
      async ({ loginDomain, loginPage }) => {
         await loginDomain.login(
            users.lockedOut.username,
            users.lockedOut.password,
         );
         const errorMessage = loginPage.errorMessage;
         await expect(errorMessage).toBeVisible();
         await expect(errorMessage).toContainText(
            'Sorry, this user has been locked out.',
         );
      },
   );
});
