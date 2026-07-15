import { registerUser } from "@datafactory/register";
import { createMessage } from "@datafactory/message";
import { test, expect } from "@fixtures/pages.fixture";

test("customer reply to a message", async ({ 
    context, 
    page, 
    loginPage,
    accountPage,
    contactPage,
    messagePage ,
    }) => {
    const timestamp = Date.now(); //get current epoch time in milliseconds
    const email = `new_user_${timestamp}@test.com`;
    const password = "Toiyhsw@34!";
    const dropdownOption = "payments";
    const message = "this is a really long message that goes on an in for at least 50 charaters";
    const messageUserAuthFile = ".auth/messageUser.json";

    await test.step("create a new user", async () =>{
        await loginPage.goto();
        await registerUser(email, password);
        await loginPage.login(email, password);

        await expect(accountPage.navMenu).toContainText("Test User");

        await context.storageState({ path: messageUserAuthFile}); // save the token and cookies
    });

    //non-data factory approach
    await test.step.skip("create a new message", async () => {
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
        await  messagePage.goto();
        await expect(messagePage.table).toContainText(message.substring(0, 25));
        await expect(messagePage.table).toContainText(dropdownOption);

        await messagePage.firstDetailLink.click();
        await expect(messagePage.messagesList).toContainText(message);

        const replyMessage = "Pizza Time";
        await messagePage.replyInput.fill(replyMessage);
        await messagePage.replyButton.click();
        await expect(messagePage.replyList).toContainText(replyMessage);
  });

});
