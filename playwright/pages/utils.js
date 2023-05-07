exports.UtilsPage = class UtilsPage {

    constructor(page) {
        this.page = page;
    }

    async screenshot(pathFile, imageName ){
        await this.page.screenshot({ path: pathFile+imageName });
    }
    
    async waitPlease(time){
        await new Promise(r => setTimeout(r, time));

    }

}