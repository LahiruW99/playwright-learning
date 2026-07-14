import { expect, request } from "@playwright/test";
import * as fs from "fs";

export async function createMessage(
  name: string,
  message: string,
  subject: string,
  authFilePath: string
) {
  const storageData = JSON.parse(fs.readFileSync(authFilePath, "utf8"));
  const token = storageData.origins[0].localStorage.find(
    (item: any) => item.name === "auth-token"
  ).value;

  const apiUrl = process.env.API_URL;
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(apiUrl + "/messages", {
    data: {
      name: name,
      message: message,
      subject: subject,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  expect(response.status()).toBe(200);
  return await response.json();
}
