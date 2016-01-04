import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import config from 'config';
import { ralphSays } from '../lib/pages.js';

let driver = null;

const mochaTimeoutMS = config.get('mochaTimeoutMS');

test.before(function() {
    this.timeout(mochaTimeoutMS);
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
});

test.describe('Ralph Says', function() {
    this.timeout(mochaTimeoutMS);

    test.it('shows a quote container', function() {
        var page = ralphSays(driver, true);
        page.quoteContainerPresent().then(function(present) {
            assert.equal(present, true, "Quote container not displayed");
        });
    });

    test.it('shows a non-empty quote', function() {
        var page = ralphSays(driver, true);
        page.quoteTextDisplayed().then(function(text) {
            assert.notEqual(text, '', 'Quote is empty');
        });
    });
});

test.afterEach(() => driver.manage().deleteAllCookies());

test.after(() => driver.quit());
