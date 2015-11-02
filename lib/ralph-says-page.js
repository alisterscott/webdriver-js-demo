var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var config = require('config');

RalphSaysPage = function RalphSaysPage(driver, visit) {
    this.driver = driver;
    this.url = config.get('url');
    this.explicitWaitMS = config.get('explicitWaitMS');
    this.quoteSelector = webdriver.By.id('quote');
    if (visit === true) {
        this.driver.get(this.url);
    }
    this.driver.wait(until.elementLocated(this.quoteSelector), this.explicitWaitMS);
};

RalphSaysPage.prototype.quoteContainerPresent = function() {
    var d = webdriver.promise.defer();
    this.driver.isElementPresent(this.quoteSelector).then(function(present) {
        d.fulfill(present);
    });
    return d.promise;
};

RalphSaysPage.prototype.quoteTextDisplayed = function() {
    var d = webdriver.promise.defer();
    this.driver.findElement(this.quoteSelector).getText().then(function(text) {
        d.fulfill(text);
    });
    return d.promise;
};

module.exports = RalphSaysPage;