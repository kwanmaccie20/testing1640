const authRoleBase = require("../pageobjects/auth.page");
const loginPage = require("../pageobjects/login.page");
const testData = require("../pageobjects/test.data.json");
const allureReporter = require("@wdio/allure-reporter").default;

const baseUrl = "https://nextuni.vercel.app/";
describe("User with role as staff access links", async () => {
  const staffLink = testData.staffLink;
  it("Login before using link for test role-based", async () => {
    await loginPage.open();
    await loginPage.login("kwanmaccie20@gmail.com", "0QDRUi");
    await browser.pause(5000);
    await loginPage.loginWithValidEmailAndPassword();
    await browser.pause(2000);
  });
  for (let link of staffLink) {
    it(`Should display ${link.expected} page with ${baseUrl}${link.url} `, async () => {
      allureReporter.addFeature("Link Access");
      await authRoleBase.open(link.url);
      await authRoleBase.pageExpect(link.expected);
      await browser.pause(2000);
    });
  }
  it("Logout after 1 batch of testing scripts", async () => {
    await authRoleBase.open('');
    await browser.pause(2000);
    await loginPage.logoutPage();
    await browser.pause(5000);
  });
});

// describe("User has not authentication access links", async () => {
//   const unAuthLink = testData.unAuthLink;
//   for (let link of unAuthLink) {
//     it(`Should display ${link.expected} page with ${baseUrl}${link.url} `, async () => {
//       allureReporter.addFeature("Link Access");

//       await authRoleBase.open(link.url);
//       await authRoleBase.pageExpect(link.expected);
//       await browser.pause(2000);
//     });
//   }
// });
