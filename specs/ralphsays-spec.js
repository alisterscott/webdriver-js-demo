var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var config = require('config');
var RalphSaysPage = require('../lib/ralph-says-page.js');
var driver;

const mochaTimeoutMS = config.get('mochaTimeoutMS');

test.before(function() {
    this.timeout(mochaTimeoutMS);
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
});

test.describe('Ralph Says', function() {
    this.timeout(mochaTimeoutMS);

    test.it('shows a quote container', function() {
        var ralphSaysPage = new RalphSaysPage(driver, true);
        ralphSaysPage.quoteContainerPresent().then(function(present) {
            assert.equal(present, true, "Quote container not displayed");
        });
    });

    test.it('shows a non-empty quote', function() {
        var ralphSaysPage = new RalphSaysPage(driver, true);
        ralphSaysPage.quoteTextDisplayed().then(function(text) {
            assert.notEqual(text, '', 'Quote is empty');
        });
    });
});

test.afterEach(function() {
    driver.manage().deleteAllCookies();
});

test.after(function() {
    driver.quit();
});