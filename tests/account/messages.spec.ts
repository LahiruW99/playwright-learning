import { registerUser } from "@datafactory/register";
import { LoginPage } from "@pages/login/login.page";
import { test, expect } from "@playwright/test";
import { ContactPage } from "@pages/contact/contact.page"
import { createMessage } from "@datafactory/message";
import { MessagesPage } from "@pages/account/messages.page"

test("customer reply to a message", async ({ context, page }) => {
    const timestamp = Date.now(); //get current epoch time in milliseconds
    const email = `new_user_${timestamp}@test.com`;
    const password = "Toiyhsw@34!";
    const dropdownOption = "payments";
    const message = "this is a really long message that goes on an in for at least 50 charaters";
    const messageUserAuthFile = ".auth/messageUser.json";

    await test.step("create a new user", async () =>{
        const loginpage = new LoginPage(page);
        await loginpage.goto();
        await registerUser(email, password);
        await loginpage.login(email, password);

        await expect(page.locator('[data-test="nav-menu"]')).toContainText("Test User");

        await context.storageState({ path: messageUserAuthFile}); // save the token and cookies
    });

    //non-data factory approach
    await test.step.skip("create a new message", async () => {
        const contactPage = new ContactPage(page);
        await contactPage.goto();
        await contactPage.subject.selectOption(dropdownOption);
        await contactPage.message.fill(message);
        await contactPage.sendButton.click();
        await expect(contactPage.successMessage).toContainText(
            "Thanks for your message! We will contact you shortly."
        );
    });

    //Data Factory Approach using api 
    await test.step("create a new messsage with datafactory", async () => {
        await createMessage(
            "Testy Mctesterface", 
            message, 
            dropdownOption, 
            messageUserAuthFile
        );
    });

    await test.step("reply and validate message", async () => {
        const messagesPage = new MessagesPage(page)
        await messagesPage.goto();
        await expect(messagesPage.table).toContainText(message.substring(0, 25));
        await expect(messagesPage.table).toContainText(dropdownOption);

        await messagesPage.firstDetailLink.click();
        await expect(messagesPage.messagesList).toContainText(message);

        const replyMessage = "Pizza Time";
        await messagesPage.replyInput.fill(replyMessage);
        await messagesPage.replyButton.click();
        await expect(messagesPage.replyList).toContainText(replyMessage);
  });

});
