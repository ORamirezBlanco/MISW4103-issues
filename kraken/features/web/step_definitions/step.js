const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const propertiesPath = path.join(__dirname, 'properties.json');
let properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

this.params = properties;

When('I enter email', async function () {
  let element = await this.driver.$('input[type="email"]');
  return await element.setValue(properties.email);
});
  
When('I enter password', async function () {
  let element = await this.driver.$('input[type="password"]');
  return await element.setValue(properties.password);
});
  
When('I click submit', async function() {
  let element = await this.driver.$('button[type="submit"]');
  return await element.click();
})

When('I enter title', async function () {
  let element = await this.driver.$('textarea:nth-child(1)');
  await element.setValue(properties.title);
  await element.keys('Tab');
  console.log("URL: ", await this.driver.getUrl())
})

When('I get new id', async function () {
  const url = await this.driver.getUrl();
  properties.newId = url.split('/')[url.split('/').length -1];
})


When('I click publish', async function () {
  let element = await this.driver.$('div[role="button"]');
  await element.click();
})

When('I click button {string}', async function (string) {
  let element = await this.driver.$(`button=${string}`);
  await element.click();
})

Then('I check exists new element with this title', async function () {
  let elements = await this.driver.$$(`h3=${properties.title}`);
  let h3 = elements.length > 0;
  expect(h3).to.equal(true);
})

When('I enter edit title', async function () {
  let element = await this.driver.$('textarea:nth-child(1)');
  return await element.setValue(properties.titleEdit);
})

Then('I check exists new element with this edit title', async function () {
  let elements = await this.driver.$$(`h3=${properties.titleEdit}`);
  let exists = elements.length > 0;
  expect(exists).to.equal(true);
})

When('I click link {string}', async function (string) {
  let element = await this.driver.$(`a=${string}`);
  await element.click();
})

When('I click a new {string}', async function (string) {
  let element = await this.driver.$(`a[href="#/editor/${string}/${properties.newId}/"]`);
  await element.click();
})

When('I open a lateral menu', async function () {
  let element = await this.driver.$('textarea:nth-child(2)');
  await element.click();
})

When('I click delete button', async function () {
  let element = await this.driver.$('.settings-menu-delete-button');
  await element.click();
})

Then('I check exists new page with this id and {string} state', async function (string) {
  let element = await this.driver.$(`a[href="#/editor/page/${properties.newId}/"] div span`);
  const status = await element.getText();
  expect(status).to.equal(string);
})

Then('I check exists new {string} with this id and title', async function (string) {
  let element = await this.driver.$(`a[href="#/editor/${string}/${properties.newId}/"] h3`);
  const status = await element.getText();
  expect(status).to.equal(properties.title);
})

Then('I check exists new {string} with this id and edit title', async function (string) {
  let element = await this.driver.$(`a[href="#/editor/${string}/${properties.newId}/"] h3`);
  const status = await element.getText();
  expect(status).to.equal(properties.titleEdit);
})

Then('I check not exists a new {string}', async function (string) {
  const elements = await this.driver.$$(`a[href="#/editor/${string}/${properties.newId}/"]`);
  expect(elements.length).to.equal(0);
})
