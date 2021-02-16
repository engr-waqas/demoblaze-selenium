const { describe, it, before, after } = require('mocha');
const { Builder, By, until } = require ('selenium-webdriver');
var expect = require('chai').expect;

describe('Login User', function() {
  let driver;
  let username = (Math.random() + 1).toString(36).substring(7);
  console.log('Enter username:', username);
  let password = (Math.random() + 1).toString(36).substring(5);

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

    const usernameInput = driver.findElement(By.id('sign-username'));
    const passwordInput = driver.findElement(By.id('sign-password'));
    const signUpButton = driver.findElement(By.xpath("//button[contains(text(),'Sign up')]"));

    await usernameInput.sendKeys(username);
    await passwordInput.sendKeys(password);
    await signUpButton.click();

    try {
      await driver.wait(until.alertIsPresent(), 5000);
      let successAlert = await driver.switchTo().alert();
      await successAlert.accept();
    } catch (error) {
      console.log(`No alert found: ${error.message}`);
    }
  });

  it('should log in successfully', async () => {
    driver.manage().setTimeouts({ implicit: 10000 });
    await driver.findElement(By.linkText('Log in')).click();

    const usernameInputField = await driver.findElement(By.id('loginusername'));
    const passwordInputField = await driver.findElement(By.id('loginpassword'));
    const loginButton = await driver.findElement(By.xpath("//button[contains(text(),'Log in')]"));

    await usernameInputField.sendKeys(username);
    await passwordInputField.sendKeys(password);
    await loginButton.click();

    driver.manage().setTimeouts({ implicit: 10000 });
    await driver.wait(until.elementLocated(By.id('nameofuser'), 10000));
    const welcomeMessage = await driver.findElement(By.id('nameofuser')).getText();
    expect(welcomeMessage).contain(username);
  });
});
