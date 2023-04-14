const authRoleBase = require('../pageobjects/auth.page');
const loginPage = require('../pageobjects/login.page');
const testData = require("../pageobjects/test.data.json");


const baseUrl = "https://nextuni.vercel.app/";

describe("User with role is admin access links", async () => {
  const adminLink = testData.adminLink;
    it("Login before using link for test role-based", async () => {
        await loginPage.open();
        await loginPage.login("nk9793@gre.com", "jqAiXP");
        await browser.pause(5000);
        await loginPage.loginWithValidEmailAndPassword();
        await browser.pause(2000);
    });
  for (let link of adminLink) {
    it(`Should display ${link.expected} page with ${baseUrl}${link.url} `, async () => {
        await authRoleBase.open(link.url);
        await authRoleBase.pageExpect(link.expected);
        await browser.pause(2000);
    });
  }
 
});

