exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.getByPlaceholder('Email Address');
        this.passwordTextbox = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
    }

    async gotoLoginPage(){
        await this.page.goto('http://localhost:2368/ghost/#/signin')
    }

    async login(){
        await this.usernameTextbox.fill('o.ramirezb@uniandes.edu.co');
        await this.passwordTextbox.fill('P4ssw0rdS3gur0!');
        await this.loginButton.click();
    }

    async loginUserPasswd(user, password){
        await this.usernameTextbox.fill(user)
        await this.passwordTextbox.fill(password)
        await this.loginButton.click()
    }


}