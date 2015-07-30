var exports = module.exports = {};
var webdriver = require('selenium-webdriver');

const webDriverImplicitTimeOut = 2000; //ms

exports.startChrome = function()
{
	GLOBAL.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
	driver.manage().timeouts().implicitlyWait(webDriverImplicitTimeOut);
};

exports.quitChrome = function()
{
	driver.quit();
};