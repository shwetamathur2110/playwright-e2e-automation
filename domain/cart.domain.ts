import { Page } from '@playwright/test';
import { CartPage } from '../pages/cart.page';

export class CartDomain {
    private cartPage: CartPage;

    constructor(private page: Page) {
        this.cartPage = new CartPage(page);
    }

    async removeFromCart() {
        while (await this.cartPage.removeButton.count() > 0) {
            await this.cartPage.removeButton.first().click();
        }
    }
}