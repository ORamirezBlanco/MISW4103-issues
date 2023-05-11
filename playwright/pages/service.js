import { Login } from './login';
import { Utils } from './utils';
import { Post } from './post';
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
            this.login = new Login(page);
            this.utils = new Utils(page);
            this.post = new Post(page);
            this.pageObj = new Page(page);
        }
    }

}





