const { describe, it, before, after } = require('mocha');
const { Builder, By, until } = require ('selenium-webdriver');

describe('Contact Us Functionality', function() {
  let driver;

  beforeEach(async function() {
    this.timeout(5000);
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.demoblaze.com');
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('should submit a contact form successfully', async () => {
    await driver.findElement(By.linkText('Contact')).click();
    driver.manage().setTimeouts({ implicit: 10000 });

    const nameInput = await driver.findElement(By.id('recipient-name'));
    const emailInput = await driver.findElement(By.id('recipient-email'));
    const messageInput = await driver.findElement(By.id('message-text'));
    const sendButton = await driver.findElement(By.xpath("//button[contains(text(),'Send message')]"));

    await nameInput.sendKeys('John Doe');
    await emailInput.sendKeys('johndoe@example.com');
    await messageInput.sendKeys('This is a test message.');
    await sendButton.click();

    try {
      await driver.wait(until.alertIsPresent(), 5000);
      let successAlert = await driver.switchTo().alert();
      await successAlert.accept();
    } catch (error) {
      console.log(`No alert found: ${error.message}`);
    }
  });
});
