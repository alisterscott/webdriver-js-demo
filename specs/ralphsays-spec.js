import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import config from 'config';
import RalphSaysPage from '../lib/ralph-says-page.js';

let driver;

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

test.describe( 'Ralph Says', function() {
	this.timeout( mochaTimeoutMS );

	test.before( async function() {
		const builder = new webdriver.Builder().withCapabilities( webdriver.Capabilities.chrome() );
		driver = await builder.build();
	} );

	test.it( 'shows a quote container', async function() {
		const page = await RalphSaysPage.Visit( driver );
		assert( await page.quoteContainerPresent(), 'Quote container not displayed' );
	} );

	test.it( 'shows a non-empty quote', async function() {
		const page = await RalphSaysPage.Visit( driver );
		assert.notEqual( await page.quoteTextDisplayed(), '', 'Quote is empty' );
	} );

	test.afterEach( async function() { await driver.manage().deleteAllCookies(); } );

	test.after( async function() { await driver.quit(); } );
} );
