var exports = module.exports = {};
var webdriver = require('selenium-webdriver');

const URL = 'http://ralphsays.github.io';

exports.quoteContainerPresent = function()
{
	var d = webdriver.promise.defer();
	driver.get(URL);
	driver.isElementPresent(webdriver.By.id('quote')).then(function(present) {
		d.fulfill(present);
	});
	return d.promise;
};

exports.quoteDisplayed = function()
{
	var d = webdriver.promise.defer();
	driver.get(URL);
	driver.findElement(webdriver.By.id('quote')).getText().then(function(text) {
		d.fulfill(text);
	});
	return d.promise;
}