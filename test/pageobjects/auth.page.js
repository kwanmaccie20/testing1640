const { expect: chaiExpect } = require("chai");
const Page = require("./page");

class AuthRoleBase extends Page {
  open(auth) {
    return super.open(auth);
  }
  openWindow(auth) {
    return super.open(auth);
  }
  async pageExpect(expectedDisplay) {
    let type = 3;
    if (expectedDisplay == "auth") type = 1;
    else if (expectedDisplay == "HTTP ERROR 403") type = 2;
    if (type == 1) {
      console.log("1 LOG............................", expectedDisplay);
      await browser.pause(2000);
      const pageUrl = await browser.getUrl();
      console.log("1 LOG............................", pageUrl);
      chaiExpect(pageUrl)
        .to.be.a("string")
        .that.equal("https://nextuni.vercel.app/auth");
    } else if (type == 2) {
      console.log("2 LOG............................", expectedDisplay);
      (await $("div.error-code")).waitForDisplayed();
      const errorCode = await $("div.error-code");
    //   .getText();
      console.log("2 LOG............................", errorCode);
      chaiExpect(await errorCode.getText()).to.a("string").that.equal(expectedDisplay);
    } else if (type == 3) {
      console.log("3 LOG............................", expectedDisplay);

      (await $('button[title="menu"] + h1')).waitForDisplayed();
      const titleDisplay = await (
        await $('button[title="menu"] + h1')
      ).getText();
      console.log("3 LOG............................", titleDisplay);
      chaiExpect(titleDisplay).to.a("string").that.equal(expectedDisplay);
    }
  }
}
module.exports = new AuthRoleBase();
