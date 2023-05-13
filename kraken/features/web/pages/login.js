class LoginPage {
  driver = {};
  host = "";

  constructor(driver, host) {
    this.driver = driver;
    this.host = host;
  }
  
  async go() {
    const url = `${this.host}/ghost/#/sigin/`;

    return this.driver.url(url);
  }

  async setEmail(value) {
    let element = await this.driver.$('input[type="email"]');
    return element.setValue(value);
  }

  async setPassword(value) {
    let element = await this.driver.$('input[type="password"]');
    return element.setValue(value);
  }

  async clickSubmit() {
    let element = await this.driver.$('button[type="submit"]');
    return element.click();
  }
} 

module.exports = { LoginPage };
