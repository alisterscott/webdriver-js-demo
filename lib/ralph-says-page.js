import webdriver from 'selenium-webdriver';
import config from 'config';

export default class RalphSaysPage {
	constructor( driver, visit = false ) {
		this.driver = driver;
		this.url = config.get('ralphURL');
		this.explicitWaitMS = config.get('explicitWaitMS');
		this.quoteSelector = webdriver.By.id('quote');

		if (visit) this.driver.get(this.url);

		this.driver.wait(webdriver.until.elementLocated(this.quoteSelector), this.explicitWaitMS);
	}
	quoteContainerPresent() {
		return this.driver.isElementPresent(this.quoteSelector);
	}
	quoteTextDisplayed() {
		return this.driver.findElement(this.quoteSelector).getText();
	}
}