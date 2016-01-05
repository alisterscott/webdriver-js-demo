import webdriver from 'selenium-webdriver';
import config from 'config';
import BasePage from './base-page.js';

const by = webdriver.By;
const until = webdriver.until;

export default class WebDriverJsDemoPage extends BasePage {
	constructor( driver, visit = false ) {
		super( driver, by.id( 'elementappearsparent' ), visit, config.get( 'demoURL' ) );
	}
	waitForChildElementToAppear() {
		return this.driver.wait( until.elementLocated( by.id( 'elementappearschild' ) ), this.explicitWaitMS, 'Could not locate the child element within the time specified' );
	}
	childElementPresent() {
		return this.driver.isElementPresent( by.id( 'elementappearschild' ) );
	}
}
