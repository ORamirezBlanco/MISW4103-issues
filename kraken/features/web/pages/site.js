class SitePage {
  driver = {};
  host = "";

  constructor(driver, host) {
    this.driver = driver;
    this.host = host;
  }
  
  async go() {
    const url = `${this.host}/ghost/#/site/`;

    return this.driver.url(url);
  }

  async clickLinkByName(value) {
    let element = await this.driver.$(`a=${value}`);
    return element.click();
  }

  async getH3TextForListEditorElement(type, id) {
    let element = await this.driver.$(`a[href="#/editor/${type}/${id}/"] h3`);
    return await element.getText();    
  }

  async clickListElement(type, id) {
    let element = await this.driver.$(`a[href="#/editor/${type}/${id}/"] h3`);
    await element.click();
  }

  async getSpanTextForListEditorElement(type, id) {
    let element = await this.driver.$(`a[href="#/editor/${type}/${id}/"] div span`);
    return await element.getText();
  }
} 

module.exports = { SitePage };
