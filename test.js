const { describe, it, before, after } = require('mocha');
const { Builder, By, Key, until } = require('selenium-webdriver');
require("chromedriver");
const assert = require('assert');

describe('Sign Up Functionality', function() {
  let driver;

  before(async function() {
    this.timeout(5000); // increase the timeout value to 5000ms
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.demoblaze.com');
    // await driver.manage().window().maximize();
  });

  after(async function() {
    await driver.quit();
  });

  it('should sign up a new user', async function() {
    // Navigate to the sign-up page
    // var text = await driver.findElement(By.id('signin2')).click();
    await driver.findElement(By.id('signin2')).click();
    // this.timeout(10000); // increase the timeout value to 5000ms
    // driver.switchTo().activeElement()

    await driver.wait(until.elementLocated(By.id('signInModal')), 10000);
    // await driver.wait(until.elementLocated(By.xpath("//div[@id='signInModal']//iframe")), 5000);
    // await driver.wait(async () => {
    //   const modalFrame = await driver.findElement(By.className('modal-dialog'));
    //   debugger;
    //   console.log('hoiiiiiiii');
    //   return modalFrame.isDisplayed();
    // }, 5000);
    // const modalFrame = await driver.findElement(By.className('modal-dialog'));
    // await driver.switchTo().frame(modalFrame);

    await driver.wait(until.elementLocated(By.id('sign-username')), 30000);
    // await driver.findElement(By.id('sign-username')).sendKeys('testuser');
    const myElement = await driver.findElement(By.id('sign-username'));
    await myElement.sendKeys('some text');
    // if (await myElement.isDisplayed()) {
    //   await myElement.sendKeys('testuser', Key.RETURN);
    //   console.log('Text is:', myElement.getText());
    // }

    // await driver.findElement(By.id('sign-password')).sendKeys('testpassword');
    // await driver.findElement(By.css('.modal-footer .btn-primary')).click();

    // // Verify that the sign-up was successful
    // const welcomeMessage = await driver.wait(
    //   until.elementLocated(By.className('text-align-left')), 5000
    // );
    // const messageText = await welcomeMessage.getText();
    // assert.equal(messageText, 'Welcome testuser');
  });

  // it('should show an error message if the username is already taken', async function() {
  //   // Navigate to the sign-up page
  //   await driver.findElement(By.id('signin2')).click();
  //   await driver.findElement(By.id('sign-username')).sendKeys('testuser');
  //   await driver.findElement(By.id('sign-password')).sendKeys('testpassword');
  //   await driver.findElement(By.css('.modal-footer .btn-primary')).click();

  //   // Verify that an error message is displayed
  //   const errorMessage = await driver.wait(
  //     until.elementLocated(By.className('modal-body')), 5000
  //   );
  //   const messageText = await errorMessage.getText();
  //   assert.equal(messageText, 'This user already exist.');
  // });
});
