import { Login341 } from './3.41/login';
import { Login444 } from './4.44/login';
import { Utils } from './utils';
import { Post341 } from './3.41/post';
import { Post444 } from './4.44/post';
import { Page } from './page';
import dotenv from 'dotenv';

exports.Service = class Service {
    login = {};
    utils = {};
    post = {};
    pageObj = {};

    constructor(page) {
        let result = dotenv.config();
        if (result.error) {
            throw result.error
        }


        if (process.env.GHOST_VERSION == '3.41') {
            this.login = new Login341(page);
            this.utils = new Utils(page);
            this.post = new Post341(page);
            this.pageObj = new Page(page);
        }
        if (process.env.GHOST_VERSION == '4.44') {
            this.login = new Login444(page);
            this.utils = new Utils(page);
            this.post = new Post444(page);
            this.pageObj = new Page(page);
        }
    }

}





