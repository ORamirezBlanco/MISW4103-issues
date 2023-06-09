const { Utils } = require("../utils");
exports.Login341 = class Login341 extends Utils {

    constructor(page) {
        super(page);
        this.page = page;
        this.usernameTextbox = page.getByPlaceholder('Email Address');
        this.passwordTextbox = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
    }

    async gotoLoginPage() {
        await this.page.goto(process.env.GHOST_PAGE);
    }

    async login() {
        await this.usernameTextbox.fill(process.env.USER_EMAIL);
        await this.passwordTextbox.fill(process.env.USER_PASSW);
        await this.loginButton.click();
    }

    async loginUserPasswd(user, password) {
        await this.usernameTextbox.fill(user)
        await this.passwordTextbox.fill(password)
        await this.loginButton.click()
    }


}