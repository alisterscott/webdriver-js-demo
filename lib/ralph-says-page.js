import webdriver from 'selenium-webdriver';
import config from 'config';
import BasePage from './base-page.js';

export default class RalphSaysPage extends BasePage {
	constructor( driver, visit = false ) {
		const quoteSelector = webdriver.By.id( 'quote' );
		super( driver, quoteSelector, visit, config.get( 'ralphURL' ) );
		this.quoteSelector = quoteSelector;
	}
	quoteContainerPresent() {
		return this.driver.isElementPresent( this.quoteSelector );
	}
	quoteTextDisplayed() {
		return this.driver.findElement( this.quoteSelector ).getText();
	}
}
