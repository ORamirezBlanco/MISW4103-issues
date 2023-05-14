const { Given, When, Then } = require('@cucumber/cucumber');
const {LoginPage} = require('../pages/login');
const {EditorPage} = require('../pages/editor');
const {SitePage} = require('../pages/site')
const fs = require('fs');
const path = require('path');
let properties = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../properties.json'), 'utf8'));
const expect = require('chai').expect;

this.params = properties;

const testFolder = path.join(__dirname, `../../../tests`);
let testNameFolder = "";
let loginPage = {};
let editorPage = {};
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
  editorPage = new EditorPage(this.driver, properties.host);
  sitePage = new SitePage(this.driver, properties.host);
});

Given('I navigate to editor {string}', async function (type) {
  await editorPage.gotoEditor(type);
});

When('I enter and submit credentials', async function () {
  await loginPage.setEmail(properties.email);
  await loginPage.setPassword(properties.password);
  await loginPage.clickSubmit();
  
  saveScreenshot(`enter_credentials`);
});

When('I enter title', async function () {
  await editorPage.setTitle(properties.title);

  saveScreenshot(`enter_title`);
})

When('I enter edit title', async function () {
  await editorPage.setTitle(properties.titleEdit);

  saveScreenshot(`enter_edit_title`);
})

When('I get new id', async function () {
  properties.newId = await editorPage.getId();
})

When('I go to list {string} {string}', async function (linkName1, linkName2) {
  await editorPage.clickLinkByName(linkName1);
  await this.driver.pause(1000);
  await editorPage.clickLinkByName(linkName1);
  await this.driver.pause(2000);
  await sitePage.clickLinkByName(linkName2);
  
  saveScreenshot(`goto_list_${linkName1}_${linkName2}`);
})

When('I publish element', async function () {
  await editorPage.openPublishMenu();
  await this.driver.pause(1000);
  await editorPage.clickPublishButton();
  if(await editorPage.checkExistsPublishButton() === true) {
    await editorPage.clickPublishButton();
  }
  
  saveScreenshot(`publish_post`);
})

When('I click a new {string}', async function (type) {
  await sitePage.clickListElement(type, properties.newId);
  saveScreenshot(`click_a_new_${type}`);
})

When('I open a lateral menu', async function () {
  await editorPage.openLateralMenu();
  saveScreenshot(`open_lateral_menu`);
})

When('I delete element', async function () {
  await editorPage.clickDeleteButton();
  saveScreenshot(`delete_element`);
})

When('I confirm delete element', async function () {
  await editorPage.clickConfirmDelete();
  saveScreenshot(`delete_element`);
})

Then('I check exists new page with this id and {string} state', async function (status) {
  const text = await sitePage.getSpanTextForListEditorElement("page", properties.newId);
  expect(status).to.equal(text);
})

Then('I check exists new {string} with this id and title', async function (type) {
  const title = await sitePage.getH3TextForListEditorElement(type, properties.newId);
  expect(title).to.equal(properties.title);
})

Then('I check exists new {string} with this id and edit title', async function (type) {
  const title = await sitePage.getH3TextForListEditorElement(type, properties.newId);
  expect(title).to.equal(properties.titleEdit);
})

Then('I check not exists a new {string}', async function (type) {
  const exists = await sitePage.existsListElement(type, properties.newId);
  expect(exists).to.equal(false);
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