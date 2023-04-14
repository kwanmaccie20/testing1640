const LoginPage = require('./test/pageobjects/login.page')
const SecurePage = require('./test/pageobjects/secure.page');
const Page = require('./test/pageobjects/page');
let reportAggregator;
describe('My Login application', async () => {
    
    // it('should login with valid credentials', async () => {
        const email = ["toms", "hello"] 
        for ( let item of email) {
             // describe(`Login with ${email}`, ()=>{
                it('Should out ' + item, async () => {
                    await LoginPage.open()
                    await LoginPage.login('Anfjfz@ajja.d', 'SuperSecretPassword!')
                    await LoginPage.loginWithInvalidEmailFormat();  
                    await browser.pause(5000);
                   });
                // }); 
        }
      
    })
//   })


