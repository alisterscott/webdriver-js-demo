var assert = require('assert');
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var driver;

const mochaTimeOut = 30000; //msconst mochaTimeOut = 30000; //ms
const webDriverImplicitTimeOut = 2000; //ms

test.before(function() {
  this.timeout(mochaTimeOut);
  driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  driver.manage().timeouts().implicitlyWait(webDriverImplicitTimeOut);
});


test.describe('Ralph Says', function() {
  this.timeout(mochaTimeOut);

  test.it('shows a quote container', function() {   
    driver.get('http://ralphsays.github.io');
    driver.isElementPresent(webdriver.By.id('quote')).then(function(present) {
      assert.equal(present, true, 'Quote container is not displayed');
    });
  });

  test.it('shows a non empty quote', function() {   
    driver.get('http://ralphsays.github.io');
    driver.findElement(webdriver.By.id('quote')).getText().then(function(text) {
      assert.notEqual(text, '', 'Quote is empty');
    });
  });

});


test.after(function() {
  driver.quit();
});