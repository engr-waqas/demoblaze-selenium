const { describe, it, before, after } = require('mocha');
const { Builder,By, Key, until } = require ('selenium-webdriver');

describe('Add to Cart and Place order', function() {
  let driver;

  before(async function() {
    this.timeout(5000);
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.demoblaze.com');
  });

  after(async function() {
    await driver.quit();
  });

  it('Adds to cart', async function() {
    await driver.wait(until.elementsLocated(By.css('.card-title > a'), 7000));
    let item = await driver.findElements(By.css('.card-title > a'));
    await item[0].click();
    this.timeout(5000);

    await driver.wait(until.elementLocated(By.className('btn-success'), 7000));
    let cartButton = await driver.findElement(By.className('btn-success'));
    await cartButton.click();
    this.timeout(5000);

    try {
      await driver.wait(until.alertIsPresent(), 5000);
      let successAlert = await driver.switchTo().alert();
      await successAlert.accept();
    } catch (error) {
      console.log(`No alert found: ${error.message}`);
    }
  });

  it('Checkouts / Places Order', async function() {
    const cartButton = await driver.findElement(By.id('cartur'));
    await cartButton.click();
    this.timeout(5000);

    await driver.findElement(By.xpath("//button[contains(text(),'Place Order')]")).click();
    await driver.manage().setTimeouts({ implicit: 5000 });

    const nameInput = await driver.findElement(By.id('name'));
    const countryInput = await driver.findElement(By.id('country'));
    const cityInput = await driver.findElement(By.id('city'));
    const cardInput = await driver.findElement(By.id('card'));
    const monthInput = await driver.findElement(By.id('month'));
    const yearInput = await driver.findElement(By.id('year'));
    
    nameInput.sendKeys('Test Name');
    countryInput.sendKeys('Test Country');
    cityInput.sendKeys('Test City');
    cardInput.sendKeys(123456789);
    monthInput.sendKeys(4);
    yearInput.sendKeys(2023);
    
    await driver.findElement(By.css('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')).click();
    await driver.findElement(By.className('confirm')).click();
  });
});
