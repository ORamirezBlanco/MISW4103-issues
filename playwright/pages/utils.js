const data_apriori = require("./../data/data.json");
exports.Utils = class Utils {

    constructor(page) {
        this.page = page;
    }

    async screenshot(pathFile, imageName) {
        await this.page.screenshot({ path: pathFile + imageName });
    }

    async waitPlease(time) {
        if(!time){
            time = process.env.WAIT_TIME;
        }
        await new Promise(r => setTimeout(r, time));

    }

    async add_cero(numb) {
        if (numb < 10) {
            return '0' + numb;
        } else {
            return '' + numb;
        }
    }

    async getNewTitle(){
        if (process.env.DATA_STRATEGY== 'a-priori'){
            return data_apriori.new_title;
        }

        if (process.env.DATA_STRATEGY== 'pseudo'){
            
        }

        if (process.env.DATA_STRATEGY== 'aleatorio'){
            
        }
    }

    async getEditTitle(){
        if (process.env.DATA_STRATEGY== 'a-priori'){
            return data.edit_title;
        }

        if (process.env.DATA_STRATEGY== 'pseudo'){
            
        }

        if (process.env.DATA_STRATEGY== 'aleatorio'){
            
        }
    }

}