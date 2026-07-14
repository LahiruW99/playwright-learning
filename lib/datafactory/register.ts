import { expect, request } from "@playwright/test";

export async function registerUser(email: string, password: string){
const apiUrl = process.env.API_URL 
const createRequestContext = await request.newContext();
const response = await createRequestContext.post(apiUrl + '/users/register', {
  data: {
    first_name: "Test",
    last_name: "User",
    dob: "1999-04-19",
    phone: "0718798767",
    email: email,
    password: password,
    address:{
        street: "Zoey Mountain",
        house_number: "12",
        city: "Leslychester",
        state: "Wisconsin",
        country: "LK",
        postal_code: "12900",
    },
},

});
expect(response.status()).toBe(201);
return response.status();
};
