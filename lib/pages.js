import webdriver from 'selenium-webdriver';
import config from 'config';

export function ralphSays(driver, visit) {
    const url = config.get('url');
    const explicitWaitMS = config.get('explicitWaitMS');
    const quoteSelector = webdriver.By.id('quote');
    if (visit) driver.get(url);
    driver.wait(webdriver.until.elementLocated(quoteSelector), explicitWaitMS);
    return {
        quoteContainerPresent: () => driver.isElementPresent(quoteSelector),
        quoteTextDisplayed: () => driver.findElement(quoteSelector)
    }
};
