import { test as setup,expect } from "@playwright/test";
import { LoginPage } from "../lib/pages/login.page";

setup("Create customer 02 auth", async ({ page, context }) =>{
    const email = "customer2@practicesoftwaretesting.com";
    const password = "welcome01";
    const customer01AuthFile = ".auth/customer01.json";

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);

    await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
    await context.storageState({ path: customer01AuthFile });
});
