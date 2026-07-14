import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBUtton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId("email");
        this.passwordInput = page.getByTestId("password");
        this.loginBUtton = page.getByTestId("login-submit");
    }

    async goto() {
        await this.page.goto("/auth/login");
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBUtton.click();
    }
}