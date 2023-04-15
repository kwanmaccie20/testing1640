const LoginPage = require("../pageobjects/login.page");
const testData = require("../pageobjects/test.data.json");
const allureReporter = require("@wdio/allure-reporter").default;
describe("Login with invalid email", async () => {
  const invalidEmailInCredential = testData.invalidEmailInCredential;
  for (let user of invalidEmailInCredential) {
    it(`Should log in fail with "${user.email}" and "${user.password}"`, async () => {
      allureReporter.addFeature("Login");

      await LoginPage.open();
      await LoginPage.login(user.email, user.password);
      await LoginPage.loginWithInvalidEmailFormat();
    });
  }
 
});

describe("Login with invalid password or email (correct email format)", async () => {
    const invalidCredentials = testData.invalidCredentials;
    for (let user of invalidCredentials) {
        it(`Should log in fail with "${user.email}" and "${user.password}"`, async () => {
          allureReporter.addFeature("Login");

          await LoginPage.open();
          await LoginPage.login(user.email, user.password);
          await LoginPage.loginWIthInvalidEmailOrPassword();
        });
      }
});

describe("Login with valid password and email (correct email format)", async () => {
    const validCredentials = testData.validCredentials;
    for (let user of validCredentials) {
        it(`Should log in success with "${user.email}" and "${user.password}"`, async () => {
          allureReporter.addFeature("Login");

          await LoginPage.open();
          await LoginPage.login(user.email, user.password);
          await browser.pause(5000);
          await LoginPage.loginWithValidEmailAndPassword();
          await LoginPage.logoutPage();
          await browser.pause(2000);
        });
      }
});