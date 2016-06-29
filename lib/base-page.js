import webdriver from 'selenium-webdriver';
import config from 'config';
import { map } from 'lodash';

const until = webdriver.until;

export default class BasePage {
	constructor( driver, expectedElementSelector, visit = false, url = null ) {
		this.explicitWaitMS = config.get( 'explicitWaitMS' );
		this.driver = driver;
		this.expectedElementSelector = expectedElementSelector;
		this.url = url;

		if ( visit ) this.driver.get( this.url );

		this.driver.wait( until.elementLocated( this.expectedElementSelector ), this.explicitWaitMS );
	}

	consoleErrors() {
		return this.driver.manage().logs().get( 'browser' ).then( ( logs ) => {
			return map( logs, ( log ) => log.message );
		} );
	}
}
