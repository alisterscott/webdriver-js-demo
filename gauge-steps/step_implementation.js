/* globals gauge*/

import assert from 'assert';
import webdriver from 'selenium-webdriver';
import RalphSaysPage from '../lib/ralph-says-page.js';

let driver;
let page;

// --------------------------
// Gauge step implementations
// --------------------------

step( "Visit the Ralph Says Page", async function() {
  page = await RalphSaysPage.Visit( driver );
} );

step( "The Ralph Says Page shows a quote container", async function() {
	assert( await page.quoteContainerPresent(), 'Quote container not displayed' );
} );

// ---------------
// Execution Hooks
// ---------------

beforeScenario( async function() {
  const builder = new webdriver.Builder().withCapabilities( webdriver.Capabilities.chrome() );
  driver = await builder.build();
} );

afterScenario( async function() {
  await driver.quit();
} );
