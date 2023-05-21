const { Given, When, Then } = require('@cucumber/cucumber');
const {LoginPage} = require('../pages/login');
const {EditorPage} = require('../pages/editor');
const {SitePage} = require('../pages/site');
const {DataStrategy} = require('../data_strategy/data');
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
let d = {};
let dataStrategy = {};
let cache = {};

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
  dataStrategy = new DataStrategy(properties.strategy.name, properties.strategy.config);
  await dataStrategy.init();
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
  cache.editorTitle = dataStrategy.getEditorTitle();
  await editorPage.setTitle(cache.editorTitle);

  saveScreenshot(`enter_title`);
})

When('I enter big title', async function () {
  cache.editorTitle = dataStrategy.getEditorTitleMoreThan257();
  await editorPage.setTitle(cache.editorTitle);

  saveScreenshot(`enter_title`);
})

When('I enter naughty title', async function () {
  cache.editorTitle = dataStrategy.getEditorNaughtyTitle();
  await editorPage.setTitle(cache.editorTitle);

  saveScreenshot(`enter_title`);
})

When('I enter sentence title', async function () {
  cache.editorTitle = dataStrategy.getEditorSentenceTitle();
  await editorPage.setTitle(cache.editorTitle);

  saveScreenshot(`enter_edit_title`);
})

When('I enter invalid publish date', async function () {
  cache.editorDate = dataStrategy.getEditorInvalidPublishDate();
  await editorPage.setPublishDate(cache.editorDate);

  saveScreenshot(`enter_publish_date`);
})

When('I enter lower range publish date', async function () {
  cache.editorDate = dataStrategy.getEditorLowerRangePublishDate();
  await editorPage.setPublishDate(cache.editorDate);

  saveScreenshot(`enter_publish_date`);
})

When('I enter nonexistent author', async function () {
  cache.author = dataStrategy.getEditorInvalidAuthor();
  await editorPage.appendAuthor(cache.author);

  saveScreenshot(`enter_author`);
})

When('I enter invalid publish hour', async function () {
  cache.editorHour = dataStrategy.getEditorInvalidPublishHour();
  await editorPage.setPublishHour(cache.editorHour);

  saveScreenshot(`enter_publish_hour`);
})

When('I get new id', async function () {
  cache.newId = await editorPage.getId();
})

When('I go to list {string} {string}', async function (linkName1, linkName2) {
  await editorPage.clickLinkByName(linkName1);
  await this.driver.pause(1000);
  await editorPage.clickLinkByName(linkName1);
  await this.driver.pause(2000);
  await sitePage.clickLinkByName(linkName2);
  
  saveScreenshot(`goto_list_${linkName1}_${linkName2}`);
})

When('I go to list {string}', async function (linkName) {
  await editorPage.clickLinkByName(linkName);
  
  saveScreenshot(`goto_list_${linkName}`);
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

When('I publish element with upper date limit', async function () {
  await editorPage.openPublishMenu();
  await this.driver.pause(1000);
  const date = dataStrategy.getEditorScheduleDateUpperLimit();
  await editorPage.setPublishDate(date);
  await this.driver.pause(1000);
  await editorPage.clickScheduleButton();
  
  saveScreenshot(`schedule`);
})

When('I click a new {string}', async function (type) {
  await sitePage.clickListElement(type, cache.newId);
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

Then('I check not exists new id', async function () {
  cache.newId = await editorPage.getId();
  expect(cache.newId?.length).to.equal(4);
})

Then('I check exists data loss warning message', async function () {
  const exists = await editorPage.checkExistsdataLossWarningMessage();
  expect(exists).to.equal(true);
})

Then('I check exists new page with this id, title and {string} state', async function (status) {
  const text = await sitePage.getSpanTextForListEditorElement("page", cache.newId);
  const title = await sitePage.getH3TextForListEditorElement("page", cache.newId);
  expect(status).to.equal(text);
  expect(title).to.equal(cache.editorTitle);
})

Then('I check exists new {string} with this id and title', async function (type) {
  const title = await sitePage.getH3TextForListEditorElement(type, cache.newId);
  expect(title).to.equal(cache.editorTitle);
})

Then('I check exists new {string} with this id and edit title', async function (type) {
  const title = await sitePage.getH3TextForListEditorElement(type, cache.newId);
  expect(title).to.equal(cache.editorTitle);
})

Then('I check not exists a new {string}', async function (type) {
  const exists = await sitePage.existsListElement(type, cache.newId);
  expect(exists).to.equal(false);
})

Then('I check invalid publish date error message', async function () {
  const exists = await editorPage.checkExistsPublishDateError();
  expect(exists).to.equal(true);
})

Then('I check the absence publish date error message', async function () {
  const exists = await editorPage.checkExistsPublishDateError();
  expect(exists).to.equal(false);
})

Then('I check invalid publish hour error message', async function () {
  const exists = await editorPage.checkExistsPublishHourError();
  expect(exists).to.equal(true);
})
//DANIEL
When('I schedule element', async function () {
  await editorPage.openPublishMenu();
  await this.driver.pause(1000);
  await editorPage.clickRadio(2);
  await this.driver.pause(1000);

  if(await editorPage.checkExistsScheduleButton() === true) {
    await editorPage.clickScheduleButton();
  }
  
  saveScreenshot(`schedule_post`);
})

Then('I check exists post with this {string} state', async function (status) {
  const text = await sitePage.getSpanTextForListEditorElement("post", cache.newId);
  expect(status).to.equal(text);
})

Then('I check exists delete button', async function () {
  const element = await editorPage.checkExistDeleteButton();
  expect(element).to.exist;
  saveScreenshot(`exist_delete_element`);
})

When('I revert element {string} to Draft', async function (status) {
  await editorPage.openPublishMenu();
  await this.driver.pause(1000);
  await editorPage.clickRadio(1);
  await this.driver.pause(1000);

  if (status == 'Published') {
    if(await editorPage.checkExistsUnpublishButton() === true) {
      await editorPage.clickUnpublishButton();
    }
    saveScreenshot(`unpublished_post`);
  } else if(status == 'Scheduled'){
    if(await editorPage.checkExistsUnscheduleButton() === true) {
      await editorPage.clickUnscheduleButton();
    }
    saveScreenshot(`unschedule_post`);
  }
  
  saveScreenshot(status + `_post`);
})