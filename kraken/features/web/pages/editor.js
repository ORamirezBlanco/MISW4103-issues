class EditorPage {
  driver = {};
  host = "";

  constructor(driver, host) {
    this.driver = driver;
    this.host = host;
  }
  
  async gotoEditor(type) {
    const url = `${this.host}/ghost/#/editor/${type}/`;

    return this.driver.url(url);
  }

  async setTitle(value) {
    let element = await this.driver.$('.gh-editor-title');
    await element.setValue(value);
    await element.keys('Tab');
  }

  async setPublishDate(value) {
    let element = await this.driver.$('input[placeholder="YYYY-MM-DD"]');
    await element.click();
    await element.setValue(value);
    await element.keys('Tab');
  }

  async appendAuthor(value) {
    let element = await this.driver.$('#author-list');
    await element.click();
    await element.addValue(value);
    await element.keys('Tab');
  }

  async setPublishHour(value) {
    let element = await this.driver.$('.gh-date-time-picker-time input');
    await element.setValue(value);
    await element.keys('Tab');
  }

  async checkExistsPublishDateError() {
    let elements = await this.driver.$$(`.gh-date-time-picker-date.error`);
    return elements.length > 0;
  }

  async checkExistsPublishHourError() {
    let elements = await this.driver.$$(`.gh-date-time-picker-time.error`);
    return elements.length > 0;
  }

  async getId() {
    const url = await this.driver.getUrl();
    return await url.split('/')[url.split('/').length -1];
  }

  async clickLinkByName(value) {
    let element = await this.driver.$(`a=${value}`);
    await element.click();
  }

  async openPublishMenu() {
    let element = await this.driver.$('div[role="button"]');
    await element.click();
  }

  async clickPublishButton() {
    let element = await this.driver.$(`button=Publish`);
    await element.click();
  }

  async clickScheduleButton() {
    let element = await this.driver.$(`button=Schedule`);
    await element.click();
  }

  async checkExistsPublishButton() {
    let elements = await this.driver.$$(`button=Publish`);
    return elements.length > 0;
  }

  async checkExistsPublishButton() {
    let elements = await this.driver.$$(`button=Publish`);
    return elements.length > 0;
  }

  async openLateralMenu() {
    let element = await this.driver.$('textarea:nth-child(2)');
    await element.click();
  }

  async clickDeleteButton() {
    let element = await this.driver.$('.settings-menu-delete-button');
    await element.click();
  }

  async clickConfirmDelete() {
    let element = await this.driver.$(`button=Delete`);
    await element.click();
  }
  //DANIEL
  async clickRadio(value) {
    let element = await this.driver.$(`.gh-publishmenu-section .gh-publishmenu-radio:nth-of-type(${value}) .gh-publishmenu-radio-button`);
    await element.click();
  } 

  async clickScheduleButton() {
    let element = await this.driver.$(`button=Schedule`);
    await element.click();
  }

  async checkExistsScheduleButton() {
    let elements = await this.driver.$$(`button=Schedule`);
    return elements.length > 0;
  }

  async checkExistsdataLossWarningMessage() {
    let elements = await this.driver.$$(`.fullscreen-modal`);
    return elements.length > 0;
  }

  async checkExistDeleteButton() {
    let element = await this.driver.$('.settings-menu-delete-button');  
    return element.length > 0;
  }

  async checkExistsUnpublishButton() {
    let elements = await this.driver.$$(`button=Unpublish`);
    return elements.length > 0;
  }  

  async clickUnpublishButton() {
    let element = await this.driver.$(`button=Unpublish`);
    await element.click();
  }
  
  async checkExistsUnscheduleButton() {
    let elements = await this.driver.$$(`button=Unschedule`);
    return elements.length > 0;
  }

  async clickUnscheduleButton() {
    let element = await this.driver.$(`button=Unschedule`);
    await element.click();
  }
  
} 

module.exports = { EditorPage };
