import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://reqres.in';

test.describe('ReqRes API tests ', () => {
   test(
      'GET - should fetch list of users',
      { tag: '@api' },
      async ({ request }) => {
         const response = await request.get(
            `${API_BASE_URL}/api/users?page=2`,
            {
               headers: {
                  'x-api-key': process.env.REQRES_API_KEY!,
               },
            },
         );
         expect(response.status()).toBe(200);
         const responseBody = await response.json();
         expect(responseBody).toHaveProperty('data');
         expect(Array.isArray(responseBody.data)).toBe(true);
         expect(responseBody.data.length).toBeGreaterThan(0);
      },
   );

   test(
      'POST - should create a new user',
      { tag: '@api' },
      async ({ request }) => {
         const response = await request.post(`${API_BASE_URL}/api/users`, {
            headers: {
               'x-api-key': process.env.REQRES_API_KEY!,
            },
            data: {
               name: 'John Doe',
               job: 'Software Engineer',
            },
         });
         expect(response.status()).toBe(201);
         const responseBody = await response.json();
         expect(responseBody).toHaveProperty('id');
         expect(responseBody.name).toBe('John Doe');
         expect(responseBody.job).toBe('Software Engineer');
      },
   );

   test(
      'POST - Login failure with missing password',
      { tag: '@api' },
      async ({ request }) => {
         const response = await request.post(`${API_BASE_URL}/api/login`, {
            headers: {
               'x-api-key': process.env.REQRES_API_KEY!,
            },
            data: {
               email: 'test@test.com',
               // password is intentionally missing to trigger the error
            },
         });
         expect(response.status()).toBe(400);
         const responseBody = await response.json();
         expect(responseBody).toHaveProperty('error');
         expect(responseBody.error).toBe('Missing password');
      },
   );
});
