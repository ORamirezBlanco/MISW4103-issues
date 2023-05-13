const { Given, When, Then } = require('@cucumber/cucumber');
const {LoginPage} = require('../pages/login');
const {PostPage} = require('../pages/post');
const {SitePage} = require('../pages/site')
const fs = require('fs');
const path = require('path');
let properties = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../properties.json'), 'utf8'));
const expect = require('chai').expect;

this.params = properties;

const testFolder = path.join(__dirname, `../../../tests`);
let testNameFolder = "";
let loginPage = {};
let postPage = {};
let sitePage = {};
let count = 1;
let d = {}
function saveScreenshot(step) {
  const order = count.toString().padStart(2, '0');
  d.saveScreenshot(`${testNameFolder}/${order}_${step}.png`);
  count++;
}

Given('I initialize test {string}', async function (testName) {
  if (!fs.existsSync(testFolder)) {
    fs.mkdirSync(testFolder);
  }
  testNameFolder = `${testFolder}/${testName}_${properties.version}`;
  if (!fs.existsSync(testNameFolder)) {
    fs.mkdirSync(testNameFolder);
  }
  d = this.driver;
  loginPage = new LoginPage(this.driver, properties.host);
  postPage = new PostPage(this.driver, properties.host);
  sitePage = new SitePage(this.driver, properties.host);
});

Given('I navigate to editor {string}', async function (type) {
  await postPage.gotoEditor(type);
});

When('I enter and submit credentials', async function () {
  await loginPage.setEmail(properties.email);
  await loginPage.setPassword(properties.password);
  await loginPage.clickSubmit();
  
  saveScreenshot(`enter_credentials`);
});

When('I enter title', async function () {
  await postPage.setTitle(properties.title);

  saveScreenshot(`enter_title`);
})

When('I enter edit title', async function () {
  await postPage.setTitle(properties.titleEdit);

  saveScreenshot(`enter_edit_title`);
})

When('I get new id', async function () {
  properties.newId = await postPage.getId();
})

When('I go to list {string} {string}', async function (linkName1, linkName2) {
  await postPage.clickLinkByName(linkName1);
  await this.driver.pause(1000);
  await postPage.clickLinkByName(linkName1);
  await this.driver.pause(2000);
  await sitePage.clickLinkByName(linkName2);
  
  saveScreenshot(`goto_list_${linkName1}_${linkName2}`);
})

Then('I check exists new {string} with this id and title', async function (type) {
  const title = await sitePage.getH3TextForListEditorElement(type, properties.newId);
  expect(title).to.equal(properties.title);
})

Then('I check exists new {string} with this id and edit title', async function (type) {
  const title = await sitePage.getH3TextForListEditorElement(type, properties.newId);
  expect(title).to.equal(properties.titleEdit);
})

When('I publish post', async function () {
  await postPage.openPublishMenu();
  await this.driver.pause(1000);
  await postPage.clickPublishButton();
  if(await postPage.checkExistsPublishButton() === true) {
    await postPage.clickPublishButton();
  }
  
  saveScreenshot(`publish_post`);
})

When('I click a new {string}', async function (type) {
  await sitePage.clickListElement(type, properties.newId);
  saveScreenshot(`click_a_new_${type}`);
})

Then('I check exists new page with this id and {string} state', async function (status) {
  const text = await sitePage.getSpanTextForListEditorElement("page", properties.newId);
  expect(status).to.equal(text);
})

//UNMIGRATED
Then('I check exists new element with this title', async function () {
  let elements = await this.driver.$$(`h3=${properties.title}`);
  let h3 = elements.length > 0;
  expect(h3).to.equal(true);
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

When('I open a lateral menu', async function () {
  let element = await this.driver.$('textarea:nth-child(2)');
  await element.click();
})

When('I click delete button', async function () {
  let element = await this.driver.$('.settings-menu-delete-button');
  await element.click();
})

Then('I check not exists a new {string}', async function (string) {
  const elements = await this.driver.$$(`a[href="#/editor/${string}/${properties.newId}/"]`);
  expect(elements.length).to.equal(0);
})
