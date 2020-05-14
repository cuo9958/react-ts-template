import React from 'react';
import { inject } from 'mobx-react';
import { Button, Input, Message } from 'element-react';
import './index.less';
import { Link } from 'react-router-dom';

import Background from './background';

interface iProps extends iReactRoute {
    login(data: any): void;
}
interface iState {
    email: string;
    pwd: string;
}
@inject((models: any) => ({
    login: models.user.login,
}))
export default class extends React.Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
        };
    }

    render() {
        return (
            <Background>
                <div className="box">
                    <div className="title">
                        <span>云&nbsp;梭&nbsp;|&nbsp;账&nbsp;号&nbsp;登&nbsp;录</span>
                        <div className="sm">登录即可管理你的客户端</div>
                    </div>
                    <div className="content">
                        <Input placeholder="邮箱" onChange={(e: any) => this.setState({ email: e })} />
                        <Input placeholder="至少6位密码" type="password" onChange={(e: any) => this.setState({ pwd: e })} />
                        <Button onClick={this.login} className="login_btn" type="info">
                            登录
                        </Button>
                    </div>
                    <div className="footer">
                        <Link to="/forget">忘记密码？</Link>
                        <Link to="/reg">注册一个新账户+</Link>
                    </div>
                </div>
            </Background>
        );
    }

    login = async () => {
        try {
            const data = {
                nickname: '管理员',
                username: 'admin',
                token: '23243',
            };
            this.props.login(data);
            Message.success('登录成功');
            this.props.history.push('/dash');
        } catch (error) {
            console.log(error);
            Message.error(error.message);
        }
    };
}
