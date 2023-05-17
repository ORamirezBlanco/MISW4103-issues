import {faker} from '@faker-js/faker'
const data_apriori = require("./../data/data.json");
exports.Utils = class Utils {

    newTitle = '';
    editTitle = '';

    constructor(page) {
        this.page = page;
    }

    async screenshot(pathFile, imageName) {
        await this.page.screenshot({ path: pathFile + process.env.DATA_STRATEGY + '-'+ imageName });
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
            if (this.newTitle == '') {
                this.newTitle = faker.commerce.productDescription();
            }
            return this.newTitle;
        }

        if (process.env.DATA_STRATEGY== 'aleatorio'){
            faker.seed();
            return faker.commerce.productDescription();
        }
    }

    async getEditTitle(){
        if (process.env.DATA_STRATEGY== 'a-priori'){
            return data.edit_title;
        }

        if (process.env.DATA_STRATEGY== 'pseudo'){
            if (this.editTitle == '') {
                this.editTitle = faker.commerce.productDescription();
            }
            return this.editTitle;
        }

        if (process.env.DATA_STRATEGY== 'aleatorio'){
            faker.seed();
            return faker.commerce.productDescription();
        }
    }

}