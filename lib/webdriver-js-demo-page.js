import webdriver from 'selenium-webdriver';
import config from 'config';

const by = webdriver.By;
const until = webdriver.until;

export default class WebDriverJsDemoPage {
	constructor( driver, visit = false ) {
		this.driver = driver;
		this.url = config.get('demoURL');
		this.explicitWaitMS = config.get('explicitWaitMS');
		this.expectedElementSelector = by.id('elementappearsparent');

		if (visit) this.driver.get(this.url);

		this.driver.wait(webdriver.until.elementLocated(this.expectedElementSelector), this.explicitWaitMS);
	}
	waitForChildElementToAppear() {
		return this.driver.wait(until.elementLocated(by.id('elementappearschild')), this.explicitWaitMS, 'Could not locate the child element within the time specified');
	}
	childElementPresent() {
		return this.driver.isElementPresent(by.id('elementappearschild'));
	}
}