import { test, expect } from '../../fixtures/customfixtures';

test.describe('Cart Test', () => {
    test('should add 1 item to cart and verify cart contents', async ({ loginDomain, inventoryDomain, inventoryPage, cartPage, cartDomain }) => {
        const productName = 'Sauce Labs Backpack';
        const numOfPrductsToAdd = 1;
        // Login first
        await loginDomain.login('standard_user', 'secret_sauce');
        // Add a product to the cart
        await inventoryDomain.addToCart(productName);
        // Verify the cart badge shows 1 item        
        await expect(inventoryPage.cartBadge).toHaveText(numOfPrductsToAdd.toString());
        // Click on the cart link to navigate to the cart page
        await inventoryPage.cartLink.click();
        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await expect(cartPage.inventoryItemName).toHaveCount(numOfPrductsToAdd);
        await expect(cartPage.inventoryItemName).toHaveText(productName);

        // Post Condition: Remove the item from the cart and verify the cart is empty
        await cartDomain.removeFromCart();
        await expect(cartPage.inventoryItemName).not.toHaveCount(numOfPrductsToAdd);

    });

    test('should add multiple items to cart and verify cart contents', async ({ loginDomain, inventoryDomain, inventoryPage, cartPage, cartDomain }) => {
        const productNames = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'];
        const numOfPrductsToAdd = 2;
        // Login first
        await loginDomain.login('standard_user', 'secret_sauce');
        // Add a products to the cart
        await inventoryDomain.addToCart(productNames);
        // Verify the cart badge shows the correct number of items
        await expect(inventoryPage.cartBadge).toHaveText(numOfPrductsToAdd.toString());
        // Click on the cart link to navigate to the cart page
        await inventoryPage.cartLink.click();
        await expect(cartPage.cartTitle).toHaveText('Your Cart');
        await expect(cartPage.inventoryItemName).toHaveCount(numOfPrductsToAdd);
        await expect(cartPage.inventoryItemName).toHaveText(productNames);

        // Post Condition: Remove the item from the cart and verify the cart is empty
        await cartDomain.removeFromCart();
        await expect(cartPage.inventoryItemName).not.toHaveCount(numOfPrductsToAdd);

    });
});