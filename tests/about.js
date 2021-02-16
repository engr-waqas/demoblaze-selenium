const { describe, it, before, after } = require('mocha');
const { Builder, By, until } = require ('selenium-webdriver');

describe('About Us', function() {
  let driver;

  before(async function() {
    this.timeout(5000);
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.demoblaze.com');
  });

  after(async function() {
    await driver.quit();
  });

  it('Redirects to about us modal', async function() {
    const aboutUsLink = await driver.findElement(By.linkText('About us'));
    await aboutUsLink.click();
    this.timeout(5000);

    let playButton = await driver.wait(until.elementLocated(By.css('.vjs-big-play-button > .vjs-icon-placeholder')), 5000);
    playButton.click()
  });
});
