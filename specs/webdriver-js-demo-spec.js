import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import config from 'config';
import WebDriverJsDemoPage from '../lib/webdriver-js-demo-page.js';

let driver = null;

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

test.before( function() {
	this.timeout( mochaTimeoutMS );
	driver = new webdriver.Builder().withCapabilities( webdriver.Capabilities.chrome() ).build();
} );

test.describe( 'WebDriverJsDemo', function() {
	this.timeout( mochaTimeoutMS );

	test.it( 'can wait for an element to appear', function() {
		var page = new WebDriverJsDemoPage( driver, true );
		page.waitForChildElementToAppear();
		page.childElementPresent().then( function( present ) {
			assert.equal( present, true, 'The child element is not present' );
		} );
	} );
} );

test.afterEach( () => driver.manage().deleteAllCookies() );

test.after( () => driver.quit() );
