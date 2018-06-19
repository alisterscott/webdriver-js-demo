import { By as by } from 'selenium-webdriver';
import config from 'config';
import BasePage from './base-page.js';

export default class WebDriverJsErrorPage extends BasePage {
	constructor( driver, visit = false ) {
		super( driver, by.css( '#errorpage' ), `${config.get( 'demoURL' )}/error` );
	}
}
