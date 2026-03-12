import { test, expect } from '../../fixtures/customfixtures';

test.describe('Login Test', () => {
  test('should successfully login with valid credentials', {  tag: '@smoke',}, async ({ loginDomain, inventoryPage }) => {
      await loginDomain.login('standard_user', 'secret_sauce');
      await expect(inventoryPage.productsTitle).toBeVisible();
      await expect(inventoryPage.productsTitle).toContainText('Products');
      await expect(inventoryPage.openMenuButton).toBeVisible();
  });

  test('should show error message with invalid credentials', async ({ loginDomain, loginPage }) => {
      await loginDomain.login('invalid_user', 'invalid_password');
      const errorMessage = loginPage.errorMessage;
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText(
        'Username and password do not match any user in this service'
      );
  });

  test('should show error message when locked-out user tries to login', async ({ loginDomain, loginPage }) => {
    await loginDomain.login('locked_out_user', 'secret_sauce');
    const errorMessage = loginPage.errorMessage;
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      'Sorry, this user has been locked out.'
    );
  });
});