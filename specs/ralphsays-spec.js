import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import config from 'config';
import RalphSaysPage from '../lib/ralph-says-page.js';

let driver;

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

test.describe( 'Ralph Says', function() {
	this.timeout( mochaTimeoutMS );

	test.before( function() {
		driver = new webdriver.Builder().withCapabilities( webdriver.Capabilities.chrome() ).build();
	} );

	test.it( 'shows a quote container', function() {
		var page = new RalphSaysPage( driver, true );
		page.quoteContainerPresent().then( function( present ) {
			assert.equal( present, true, 'Quote container not displayed' );
		} );
	} );

	test.it( 'shows a non-empty quote', function() {
		var page = new RalphSaysPage( driver, true );
		page.quoteTextDisplayed().then( function( text ) {
			assert.notEqual( text, '', 'Quote is empty' );
		} );
	} );

	test.afterEach( () => driver.manage().deleteAllCookies() );

	test.after( () => driver.quit() );
} );
