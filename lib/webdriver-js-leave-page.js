import { By as by } from 'selenium-webdriver';
import config from 'config';
import BasePage from './base-page.js';

export default class WebDriverJsLeavePage extends BasePage {
	constructor( driver ) {
		super( driver, by.css( '#leavepage' ), `${config.get( 'demoURL' )}/leave` );
	}

	async navHome() {
		await this.driver.findElement( by.css( '#homelink' ) ).click();
		return this.driver.switchTo().alert().then( function( alert ) {
			return alert.accept();
		} );
	}
}
