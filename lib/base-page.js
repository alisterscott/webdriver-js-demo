import webdriver from 'selenium-webdriver';
import config from 'config';
import { map } from 'lodash';

const until = webdriver.until;

export default class BasePage {
	constructor( driver, expectedElementSelector, url = null ) {
		this.explicitWaitMS = config.get( 'explicitWaitMS' );
		this.driver = driver;
		this.expectedElementSelector = expectedElementSelector;
		this.url = url;
	}

	static async Expect( driver ) {
		const page = new this( driver );
		await page.driver.wait( until.elementLocated( page.expectedElementSelector ), page.explicitWaitMS );
		return page;
	}

	static async Visit( driver, url ) {
		const page = new this( driver, url );
		if ( ! page.url ) {
			throw new Error( `URL is required to visit the ${ page.name }` );
		}
		await page.driver.get( page.url );
		await page.driver.wait( until.elementLocated( page.expectedElementSelector ), page.explicitWaitMS );
		return page;
	}

	consoleErrors() {
		return this.driver.manage().logs().get( 'browser' ).then( ( logs ) => {
			return map( logs, ( log ) => log.message );
		} );
	}
}
