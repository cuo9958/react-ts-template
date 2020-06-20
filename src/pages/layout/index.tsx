import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import Utils from '../../services/utils';
import url_configs from '../../routes/config';

import { Button, Dropdown } from 'element-react';
import './index.less';

interface iProps extends iReactRoute {
    nickname: string;
    isLogin(): boolean;
}
interface IState {
    active: string;
    layout: boolean;
}

function Menus(item: any, onSelect: any, active: string) {
    if (item.hide) return;
    return (
        <li key={item.name} className={'menu_item' + (active === item.name ? ' active' : '')} onClick={() => onSelect(item.path)}>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
        </li>
    );
}

@inject((models: any) => ({
    isLogin: models.user.isLogin,
    nickname: models.user.nickname,
}))
@observer
export default class extends React.Component<iProps, IState> {
    constructor(props: any) {
        super(props);
        const curr = Utils.checkUrl(props.location.pathname);
        this.state = {
            active: curr.name,
            layout: !curr.hideLayout,
        };
        if (curr.title) document.title = curr.title + ' | 后缀';
    }

    render() {
        if (!this.state.layout) return this.props.children;
        return (
            <Fragment>
                <div id="sider">
                    <Link to="/">
                        <div id="logo">
                            <img src="https://img5.daling.com/zin/public/specialTopic/2020/06/20/18/44/22/525400B9EA93HWRJF000008056333.png" alt="" />
                            <span>告警APP</span>
                            <small>v1.0</small>
                        </div>
                    </Link>
                    <div id="menus">
                        <ul className="menu_bg">{url_configs.map((item, index) => Menus(item, this.onSelect, this.state.active))}</ul>
                    </div>
                    <div className="footer">
                        <a href="/">前端技术支持</a>
                    </div>
                </div>
                <div id="main">
                    <div className="top_menus flex-right">
                        {this.props.nickname && (
                            <Dropdown
                                trigger="click"
                                onCommand={this.onCommand}
                                menu={
                                    <Dropdown.Menu>
                                        <Dropdown.Item command="/user_center">个人中心</Dropdown.Item>
                                        <Dropdown.Item command="/login" divided>
                                            注销
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                }
                            >
                                <span className="el-dropdown-link">
                                    {this.props.nickname}
                                    <i className="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                            </Dropdown>
                        )}
                        {!this.props.nickname && (
                            <Button type="primary" size="mini" onClick={() => this.login()}>
                                登录
                            </Button>
                        )}
                    </div>
                    <div className="height40"></div>
                    <div className="continer">{this.props.children}</div>
                </div>
            </Fragment>
        );
    }

    componentDidMount() {
        // this.props.check();
    }
    componentWillReceiveProps(pp: any) {
        const curr = Utils.checkUrl(pp.location.pathname);
        // this.props.check();
        this.setState({
            active: curr.name,
            layout: !curr.hideLayout,
        });
        if (curr.title) document.title = curr.title + ' | 后缀';
    }

    onSelect = (index: string) => {
        this.props.history.push(index);
    };
    login = () => {
        this.props.history.push('/login');
    };
    onCommand = (command: string) => {
        if (command === '/login') {
            return this.login();
        }
        this.props.history.push(command);
    };
}
