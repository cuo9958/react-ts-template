import Dash from '../pages/dash';
import Login from '../pages/login';
import Reg from '../pages/login/reg';
import Forget from '../pages/login/forget';

export default [
    {
        /**
         * 页面名,菜单命中
         */
        name: 'home',
        /**
         * 显示名称
         */
        title: '',
        /**
         * 图标
         */
        icon: '',
        /**
         * url路径
         */
        path: '/',
        /**
         * 页面组件
         */
        page: Dash,
        /**
         * 是否强制匹配
         */
        exact: true,
        /**
         * 是否隐藏外层视图
         */
        hideLayout: false,
        /**
         * 是否不在菜单展示
         */
        hide: false,
    },
    //管理首页
    { name: 'dash', title: '客户端管理', path: '/dash', icon: 'fa fa-dashboard', page: Dash, exact: true },
    //登录
    { name: 'login', title: '登录', path: '/login', page: Login, exact: true, hide: true, hideLayout: true },
    //注册
    { name: 'login', title: '注册', path: '/reg', page: Reg, exact: true, hide: true, hideLayout: true },
    //忘记密码
    { name: 'login', title: '忘记密码', path: '/forget', page: Forget, exact: true, hide: false, hideLayout: true },

    // { name: 'test', path: '*', page: Test, exact: true, hide: true }
];
