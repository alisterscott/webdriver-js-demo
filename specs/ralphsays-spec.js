import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import config from 'config';
import RalphSaysPage from '../lib/ralph-says-page.js';

let driver, page;

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'Ralph Says', function() {
	this.timeout( mochaTimeoutMS );

	before( async function() {
		const builder = new webdriver.Builder().withCapabilities( webdriver.Capabilities.chrome() );
		driver = await builder.build();
	} );

	step( 'Visit the page', async function() {
		page = await RalphSaysPage.Visit( driver );
	} );

	step( 'shows a quote container', async function() {
		assert( await page.quoteContainerPresent(), 'Quote container not displayed' );
	} );

	step( 'shows a non-empty quote', async function() {
		assert.notEqual( await page.quoteTextDisplayed(), '', 'Quote is empty' );
	} );

	afterEach( async function() { await driver.manage().deleteAllCookies(); } );

	after( async function() { await driver.quit(); } );
} );
