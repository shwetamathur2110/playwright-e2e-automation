import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

export class LoginDomain {
    private loginPage: LoginPage;

    constructor(private page: Page) {
        this.loginPage = new LoginPage(page);
    }

    async login(username: string, password: string) {
        await this.page.goto('https://www.saucedemo.com/');
        await this.loginPage.usernameInput.fill(username);
        await this.loginPage.passwordInput.fill(password);
        await this.loginPage.loginButton.click();
    }
}