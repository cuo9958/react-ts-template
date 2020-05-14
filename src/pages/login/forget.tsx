import React, { Fragment } from 'react';
import './index.less';
import Background from './background';
import { Button, Input, Message } from 'element-react';
import { Link } from 'react-router-dom';

interface IState {
    isWait: boolean;
    email: string;
}

export default class extends React.Component<iReactRoute, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isWait: false,
            email: '',
        };
    }
    render() {
        return (
            <Background>
                <Fragment>
                    {!this.state.isWait && (
                        <div className="box forget">
                            <div className="title">
                                <span>云&nbsp;梭&nbsp;|&nbsp;忘&nbsp;记&nbsp;密&nbsp;码</span>
                                <div className="sm">根据注册的邮箱重置密码</div>
                            </div>
                            <div className="content">
                                <Input placeholder="注册的邮箱" onChange={(e: any) => this.setState({ email: e })} />
                                <Button onClick={this.reg} className="login_btn" type="info">
                                    发送邮件
                                </Button>
                            </div>
                            <div className="footer">
                                <Link to="/login">去登录</Link>
                            </div>
                        </div>
                    )}
                    {this.state.isWait && (
                        <div className="box2">
                            <div className="wait_box">
                                <p>已经给您的邮箱发送了重置链接，请登录查看。</p>
                                <p>链接有效时间2小时。</p>
                                <p>
                                    <Link to="/">回到首页</Link>
                                </p>
                            </div>
                        </div>
                    )}
                </Fragment>
            </Background>
        );
    }

    reg = async () => {
        if (!/^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.state.email)) {
            return Message.error('邮箱格式不正确');
        }

        try {
            this.setState({
                isWait: true,
            });
        } catch (error) {
            console.log(error);
            Message.error(error.message);
        }
    };
}
