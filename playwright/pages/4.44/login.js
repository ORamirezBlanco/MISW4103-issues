
exports.Login444 = class Login444 {

    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.locator("[name=identification]");
        this.passwordTextbox = page.locator("[name=password]");
        this.loginButton = page.getByRole('button', { name: 'Sign in →' });
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