var ralphSaysPage = require("../lib/ralph-says-page.js");
var driverManager = require("../lib/driver-manager.js");
var assert = require('assert');
var test = require('selenium-webdriver/testing');

const mochaTimeOut = 30000; //ms

test.before(function() {
	this.timeout(mochaTimeOut);
	driverManager.startChrome();
});

test.describe('Ralph Says', function() {
	this.timeout(mochaTimeOut);

	test.it('shows a quote container', function() {   
		ralphSaysPage.quoteContainerPresent().then(function(present) {
			assert.equal(present, true, 'Quote container is not displayed');
		});
	});

	test.it('shows a non empty quote', function() {   
		ralphSaysPage.quoteDisplayed().then(function(quote) {
			assert.notEqual(quote, '', 'Quote is empty');
		});
	});
});

test.after(function() {
	driverManager.quitChrome();
});