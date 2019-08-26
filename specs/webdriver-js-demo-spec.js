import assert from 'assert';
import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import config from 'config';
import WebDriverJsDemoPage from '../lib/webdriver-js-demo-page';
import WebDriverJsErrorPage from '../lib/webdriver-js-error-page';
import WebDriverJsExpandPage from '../lib/webdriver-js-expand-page';
import WebDriverJsLeavePage from '../lib/webdriver-js-leave-page';

let driver = null;

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

before( async function() {
	this.timeout( mochaTimeoutMS );
	const pref = new webdriver.logging.Preferences();
	pref.setLevel( 'browser', webdriver.logging.Level.SEVERE );
	const builder = new webdriver.Builder().forBrowser( 'chrome' ).setLoggingPrefs( pref )
	driver = await builder.build();
} );

describe( 'WebDriverJsDemo', function() {
	this.timeout( mochaTimeoutMS );

	it( 'can wait for an element to appear', async function() {
		const page = await WebDriverJsDemoPage.Visit( driver );
		await page.waitForChildElementToAppear();
		assert( await page.childElementPresent(), 'The child element is not present' );
	} );

	it( 'can check for an alert when leaving the page', async function() {
		const page = await WebDriverJsLeavePage.Visit( driver );
		await page.navHome();
	} );

	it( 'can check for errors when there should be none', async function() {
		const page = await WebDriverJsDemoPage.Visit( driver );
		const errors = await page.consoleErrors();
		assert.deepEqual( errors, [] );
	} );

	it( 'can check for errors when there are present', async function() {
		const page = await WebDriverJsErrorPage.Visit( driver );
		const errors = await page.consoleErrors();
		assert.deepEqual( errors, [ 'http://webdriverjsdemo.github.io/scripts/error.js 0:0 Uncaught' ] );
	} );

	it( 'can check if an element is not open and only expand it if necessary', async function() {
		const page = await WebDriverJsExpandPage.Visit( driver );
		await page.expandJokeIfNecessary()
		assert.equal( await page.getPunchline(), "When you're eating a watermelon!")
	} );

	it( 'can assume the element is not open so always click it', async function() {
		const page = await WebDriverJsExpandPage.Visit( driver );
		await page.expandJoke()
		assert.equal( await page.getPunchline(), "When you're eating a watermelon!")
	} );

	it( 'can expect the element defaults to closed so always click it', async function() {
		const page = await WebDriverJsExpandPage.Visit( driver );
		await page.assertAndExpandJoke()
		assert.equal( await page.getPunchline(), "When you're eating a watermelon!")
	} );

} );

afterEach( async function() {
	if ( this.currentstate === 'failed' ) {
		await driver.get( 'data:,' );
		await driver.switchTo().alert().then( ( alert ) => {
			alert.accept();
		}, () => {} );
	}
	await driver.manage().deleteAllCookies()
} );

after( async function() { await driver.quit(); } );
