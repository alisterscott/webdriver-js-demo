import webdriver from 'selenium-webdriver';
import config from 'config';
import BasePage from './base-page.js';

const by = webdriver.By;
const until = webdriver.until;

export default class WebDriverJsDemoPage extends BasePage {
	constructor( driver, visit = false ) {
		super( driver, by.id( 'elementappearsparent' ), config.get( 'demoURL' ) );
	}

	async waitForChildElementToAppear() {
		return await this.driver.wait( until.elementLocated( by.id( 'elementappearschild' ) ), this.explicitWaitMS, 'Could not locate the child element within the time specified' );
	}

	async childElementPresent() {
		const elements = await this.driver.findElements( by.id( 'elementappearschild' ) );
		return elements.length > 0;
	}
}
