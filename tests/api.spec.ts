import { test, expect } from "@playwright/test"

test("GET /products", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com/";
    const response = await request.get(apiUrl + "brands");

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.length).toBe(2)
});

test("POST/ login", async ({ request}) => {
    const apiUrl = "https://api.practicesoftwaretesting.com/";
    const response = await request.post(apiUrl + "users/login", {
        data: {
            email: "customer2@practicesoftwaretesting.com",
            password: "welcome01"
        },
    });  
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeTruthy(); 
});
