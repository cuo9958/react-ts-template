import { observable, action } from 'mobx';
// import request from '../services/request';

interface iUser {
    email: string;
    nickname: string;
    token: string;
    headimg: string;
}

class User {
    @observable email = localStorage.getItem('ys_email');
    @observable nickname = localStorage.getItem('ys_nickname');
    @observable token = localStorage.getItem('ys_token');
    @observable headimg = localStorage.getItem('ys_headimg');

    //email,nickname
    @action login = (db: iUser) => {
        this.email = db.email;
        this.nickname = db.nickname;
        this.token = db.token;
        this.headimg = db.headimg;
        localStorage.setItem('ys_email', db.email);
        localStorage.setItem('ys_nickname', db.nickname);
        localStorage.setItem('ys_token', db.token);
        localStorage.setItem('ys_headimg', db.headimg);
    };

    isLogin = () => {
        return !!this.token;
    };

    @action check = async () => {
        if (!this.token) return;
        try {
            // await request.get('/auth/check');
        } catch (error) {
            localStorage.removeItem('ys_username');
            localStorage.removeItem('ys_nickname');
            localStorage.removeItem('ys_token');
            localStorage.removeItem('ys_headimg');
        }
    };

    getToken() {
        return this.token;
    }
}
export default new User();
