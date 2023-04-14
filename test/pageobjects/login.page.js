const { expect : chaiExpect } = require('chai');
const Page = require('./page');

class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('[test_id="uname"]');
    }
    get alertTag (){
        return $("div.mantine-Alert-root");
    }
    async getTextInputError () {
        // return await (await this.inputUsername.parentElement()).parentElement();
        return  await (await (await (await $('[test_id="uname"]')).$('..')).$('..'));
    }
    get passWordInputLayout() {
        
    }

    get inputPassword () {
        return $('[test_id="password"]');
    }

    get btnSubmit () {
        return $('#__next > div > div > div:nth-child(3) > form > div.p-4.w-full.items-center > button > div > span');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async loginWithInvalidEmailFormat() {
        const a = await this.getTextInputError();
        console.log("OK", await a.getText());
        chaiExpect(await a.getText()).to.be.a('string').that.contains('The email provided appears to be invalid based on formatting criteria.');
        // expect(this.textInputError).toHaveTextContaining(
        //     'The email provided appears to be invalid based on formatting criteria.');
    }
    async loginWithValidEmailAndPassword(){

        const pageUrl = await browser.getUrl();
        chaiExpect(pageUrl).to.be.a('string').that.equal('https://nextuni.vercel.app/');
    }
    async LoginWithValidAll(){
        (await $('button[title="menu"] + h1')).waitForDisplayed();
        const titleDisplay = await (await $('button[title="menu"] + h1')).getText;
        chaiExpect(titleDisplay).to.a('string').that.equal("Explore");
    }
    async loginWIthInvalidEmailOrPassword () {
        const alertLogin = await this.alertTag;
        await alertLogin.waitForDisplayed();
        chaiExpect(await alertLogin.getText()).to.be.a('string').that.contains('Password or email is incorrect.');
    }
    async logoutPage () {
        const avatar = await $('.mantine-Paper-root img');
        await avatar.waitForDisplayed();
        await avatar.click();
        const logoutButton = await $('aria/Logout');
        await logoutButton.waitForDisplayed();
        await logoutButton.click();
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('auth');
    }
    openWindow (){
        return super.openWindow('auth');
    }
}

module.exports = new LoginPage();
 