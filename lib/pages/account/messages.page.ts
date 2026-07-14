import { type Locator, type Page } from "@playwright/test";

export class MessagesPage {
  readonly page: Page;
  readonly table: Locator;
  readonly contactForm: Locator;
  readonly firstDetailLink: Locator;
  readonly messagesList: Locator;
  readonly replyList: Locator;
  readonly replyInput: Locator;
  readonly replyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator("div", { has: page.locator('text="Messages"') });
    this.contactForm = page.getByRole("link", { name: "contact form" });
    this.firstDetailLink = page.getByRole("link", { name: "Details" }).first();
    this.messagesList = page
      .locator("div.card")
      .filter({ hasText: "Subject:" });
    this.replyList = page
      .getByRole("heading", { name: "Replies" })
      .locator("+ div.card"); // the + is a sibling combinator
    this.replyInput = page.getByTestId("message");
    this.replyButton = page.getByTestId("reply-submit");
  }

  async goto() {
    await this.page.goto("/account/messages");
  }
}