const { describe, it, before, after } = require('mocha');
const { Builder, By, until } = require ('selenium-webdriver');

describe('Sign Up User', function() {
  let driver;

  before(async function() {
    this.timeout(5000);
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.demoblaze.com');
  });

  after(async function() {
    await driver.quit();
  });

  it('Signs up User', async function() {
    let loginButton = await driver.wait(until.elementLocated(By.id('signin2'), 10000));
    loginButton.click();
    driver.manage().setTimeouts({ implicit: 10000 });

    driver.findElement(By.id('sign-username')).sendKeys('John Abc');
    driver.findElement(By.id('sign-password')).sendKeys('Testingpass');
    driver.findElement(By.xpath('//*[@id="signInModal"]/div/div/div[3]/button[2]')).click();

    try {
      await driver.wait(until.alertIsPresent(), 5000);
      let successAlert = await driver.switchTo().alert();
      await successAlert.accept();
    } catch (error) {
      console.log(`No alert found: ${error.message}`);
    }
  });
});
