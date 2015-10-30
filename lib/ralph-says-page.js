var webdriver = require('selenium-webdriver');

RalphSaysPage = function RalphSaysPage(driver) {
    this.driver = driver;
    this.url = 'http://ralphsays.github.io';
    this.quoteSelector = webdriver.By.id('quote');
};

RalphSaysPage.prototype.visit = function() {
    this.driver.get(this.url);
    return webdriver.promise.fulfilled(true);
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