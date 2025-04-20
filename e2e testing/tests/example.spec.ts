import { test, expect } from "@playwright/test";
// const linkPage = "http://localhost:5173/register";
const linkPage = "http://localhost:5173/login";

test("regsiter user", async ({ page }) => {
  await page.goto(linkPage);
   page.getByRole('button',{name:"SignIn"});
  await expect(page.getByRole("heading", { name: "Logo" })).toBeVisible();
  await page.locator("[name=firstName]").fill("mzainmumtaz999999");
  await page.locator("[name=lastName]").fill("mzainmumtaz999999");
  await page.locator("[name=email]").fill("mzainmunnnnnnmtaz99nn975765999@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Succesfsfuy Registered")).toBeVisible();
  await expect(page.getByRole("button",{name:"Logout"})).toBeVisible()
  await expect(page.getByRole("button",{name:"My Hotels"})).toBeVisible()  
});
test("login user",async ({page})=>{
  await page.goto(linkPage);
  await expect(page.getByRole("heading",{name:"Logo"})).toBeVisible();
  await page.locator("[name=email]").fill("mzainmunnnnnnmtaz99nn975765999@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button",{name:"Submit"}).click();
  await expect(page.getByText("Logged user Succesfully")).toBeVisible();
  await expect(page.getByRole("button",{name:"Logout"})).toBeVisible()
  await expect(page.getByRole("button",{name:"My Hotels"})).toBeVisible()  
  
})

