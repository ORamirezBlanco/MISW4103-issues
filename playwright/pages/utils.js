exports.Utils = class Utils {

    constructor(page) {
        this.page = page;
    }

    async screenshot(pathFile, imageName) {
        await this.page.screenshot({ path: pathFile + imageName });
    }

    async waitPlease(time) {
        await new Promise(r => setTimeout(r, time));

    }

    async add_cero(numb) {
        if (numb < 10) {
            return '0' + numb;
        } else {
            return '' + numb;
        }
    }

}