import { test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/login/login.page";
import { AccountPage} from "@pages/account/account.page";
import { MessagesPage } from "@pages/account/messages.page";
import { ContactPage } from "@pages/contact/contact.page"

type MyPages = {
    loginPage: LoginPage;
    accountPage: AccountPage;
    messagePage: MessagesPage;
    contactPage: ContactPage;
};

export const test = baseTest.extend<MyPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },

    messagePage: async ({ page }, use) => {
        await use(new MessagesPage(page));
    },

    contactPage: async({ page }, use) => {
        await use(new ContactPage(page));
    },
});

export { expect } from "@playwright/test";