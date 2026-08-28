import { test, expect } from '../../fixtures/customfixtures';
import { users } from '../../test-data/users';
import { products } from '../../test-data/products';

test.describe('Cart Test', () => {
   test(
      'should add 1 item to cart and verify cart contents',
      { tag: ['@smoke', '@regression'] },
      async ({
         loginDomain,
         inventoryDomain,
         inventoryPage,
         cartPage,
         cartDomain,
      }) => {
         const items = [products.backpack];
         // Login first
         await loginDomain.login(
            users.standard.username,
            users.standard.password,
         );
         // Add a product to the cart
         await inventoryDomain.addToCart(items);
         // Verify the cart badge shows correct number of items
         await expect(inventoryPage.cartBadge).toHaveText(
            items.length.toString(),
         );
         // Click on the cart link to navigate to the cart page
         await inventoryPage.cartLink.click();
         await expect(cartPage.cartTitle).toHaveText('Your Cart');
         await expect(cartPage.inventoryItemName).toHaveCount(items.length);
         await expect(cartPage.inventoryItemName).toHaveText(items);

         // Post Condition: Remove the item from the cart and verify the cart is empty
         await cartDomain.removeFromCart();
         await expect(cartPage.inventoryItemName).not.toHaveCount(items.length);
      },
   );

   test(
      'should add multiple items to cart and verify cart contents',
      { tag: '@regression' },
      async ({
         loginDomain,
         inventoryDomain,
         inventoryPage,
         cartPage,
         cartDomain,
      }) => {
         const items = [products.backpack, products.fleeceJacket];
         // Login first
         await loginDomain.login(
            users.standard.username,
            users.standard.password,
         );
         // Add a products to the cart
         await inventoryDomain.addToCart(items);
         // Verify the cart badge shows the correct number of items
         await expect(inventoryPage.cartBadge).toHaveText(
            items.length.toString(),
         );
         // Click on the cart link to navigate to the cart page
         await inventoryPage.cartLink.click();
         await expect(cartPage.cartTitle).toHaveText('Your Cart');
         await expect(cartPage.inventoryItemName).toHaveCount(items.length);
         await expect(cartPage.inventoryItemName).toHaveText(items);

         // Post Condition: Remove the item from the cart and verify the cart is empty
         await cartDomain.removeFromCart();
         await expect(cartPage.inventoryItemName).not.toHaveCount(items.length);
      },
   );
});
