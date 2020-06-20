import Dash from '../pages/dash';
import Login from '../pages/login';
import Client from '../pages/dash/client';
import Msg from '../pages/dash/msg';

export default [
    // {
    //     /**
    //      * 页面名,菜单命中
    //      */
    //     name: 'home',
    //     /**
    //      * 显示名称
    //      */
    //     title: '',
    //     /**
    //      * 图标
    //      */
    //     icon: '',
    //     /**
    //      * url路径
    //      */
    //     path: '/',
    //     /**
    //      * 页面组件
    //      */
    //     page: Dash,
    //     /**
    //      * 是否强制匹配
    //      */
    //     exact: true,
    //     /**
    //      * 是否隐藏外层视图
    //      */
    //     hideLayout: false,
    //     /**
    //      * 是否不在菜单展示
    //      */
    //     hide: false,
    // },
    //管理首页
    { name: 'dash', title: '项目管理', path: '/dash', icon: 'fa fa-dashboard', page: Dash, exact: true },
    { name: 'dash', title: '客户端管理', path: '/dash/client', page: Client, exact: true, hide: true },
    { name: 'dash', title: '消息管理', path: '/dash/msg', page: Msg, exact: true, hide: true },
    //登录
    { name: 'login', title: '登录', path: '/login', page: Login, exact: true, hide: true, hideLayout: true },

    // { name: 'test', path: '*', page: Test, exact: true, hide: true }
];
