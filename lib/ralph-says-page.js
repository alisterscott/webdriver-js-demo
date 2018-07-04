import webdriver from 'selenium-webdriver';
import config from 'config';
import BasePage from './base-page.js';

export default class RalphSaysPage extends BasePage {
	constructor( driver ) {
		const quoteSelector = webdriver.By.css( '#quote' );
		super( driver, quoteSelector, config.get( 'ralphURL' ) );
		this.quoteSelector = quoteSelector;
	}

	async quoteContainerPresent() {
		const quoteElements = await this.driver.findElements( this.quoteSelector );
		return quoteElements.length > 0;
	}

	async quoteTextDisplayed() {
		const quoteElement = await this.driver.findElement( this.quoteSelector );
		return await quoteElement.getText();
	}
}
