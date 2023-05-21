import { faker } from '@faker-js/faker'
import fetch from 'node-fetch';

const data_apriori = require("./../data/data.json");
exports.Utils = class Utils {

    newTitle = '';
    editTitle = '';
    wordsError = '';

    constructor(page, validations) {
        this.page = page;
        this.validations = validations;
    }

    async screenshot(pathFile, imageName) {
        await this.page.screenshot({ path: pathFile + process.env.DATA_STRATEGY + '-' + imageName });
    }

    async waitPlease(time) {
        if (!time) {
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

    async getWordsError() {
        if (process.env.DATA_STRATEGY == 'a-priori') {
            return data_apriori.wordsError;
        }

        if (process.env.DATA_STRATEGY == 'pseudo') {
            await fetch(process.env.PSEUDO_DATA)
                .then(response => response.json())
                .then(data => {
                    this.wordsError = data.wordsError;
                })
                .catch(error => console.error(error));
            return this.wordsError;
        }

        if (process.env.DATA_STRATEGY == 'aleatorio') {
            faker.seed();
            return faker.string.alpha(2);
        }
    }

    async getNewTitle() {
        if (process.env.DATA_STRATEGY == 'a-priori') {
            if (this.validations) {
                this.newTitle = data_apriori.new_long_title;
            } else {
                this.newTitle = data_apriori.new_title;
            }
            return this.newTitle;
        }

        if (process.env.DATA_STRATEGY == 'pseudo') {
            await fetch(process.env.PSEUDO_DATA)
                .then(response => response.json())
                .then(data => {
                    if (this.validations) {
                        this.newTitle = data.longTitle;
                    } else {
                        this.newTitle = data.title;
                    }
                })
                .catch(error => console.error(error));
            return this.newTitle;
        }

        if (process.env.DATA_STRATEGY == 'aleatorio') {
            faker.seed();
            if (this.validations) {
                this.newTitle = faker.lorem.sentence({ min: 255, max: 300 });
            } else {
                this.newTitle = faker.commerce.productDescription();
            }
            return this.newTitle
        }
    }

    async getEditTitle() {
        if (process.env.DATA_STRATEGY == 'a-priori') {
            return data.edit_title;
        }

        if (process.env.DATA_STRATEGY == 'pseudo') {
            await fetch(process.env.PSEUDO_DATA)
                .then(response => response.json())
                .then(data => { this.newTitle = data.title; })
                .catch(error => console.error(error));
            return this.newTitle;
        }

        if (process.env.DATA_STRATEGY == 'aleatorio') {
            faker.seed();
            return faker.commerce.productDescription();
        }
    }

}