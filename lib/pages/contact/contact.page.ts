import { type Locator, type Page} from "@playwright/test";

export class ContactPage{
    readonly page: Page;
    readonly subject: Locator;
    readonly message: Locator;
    readonly sendButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.subject = page.getByTestId("subject");
        this.message = page.getByTestId("message");
        this.sendButton = page.getByTestId("contact-submit");
        this.successMessage = page.locator(".alert-success");
    }

    async goto(){
        await this.page.goto("/contact");
    }
}