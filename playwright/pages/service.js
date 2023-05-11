import { Login314 } from './3.14/login';
import { Login444 } from './4.44/login';
import { Utils } from './utils';
import { Post314 } from './3.14/post';
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


        if (process.env.GHOST_VERSION == '3.14') {
            this.login = new Login314(page);
            this.utils = new Utils(page);
            this.post = new Post314(page);
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





