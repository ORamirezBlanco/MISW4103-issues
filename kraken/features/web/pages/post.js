class PostPage {
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

  async checkExistsPublishButton() {
    let elements = await this.driver.$$(`button=Publish`);
    return elements.length > 0;
  }
} 

module.exports = { PostPage };
