import React, { Fragment } from 'react';
import './index.less';
import Background from './background';
import { Button, Input, Message } from 'element-react';
import { Link } from 'react-router-dom';
import utils from '../../services/utils';

interface IState {
    isWait: boolean;
    email: string;
    pwd: string;
}
interface IParams {
    code?: string;
}
export default class extends React.Component<iReactRoute, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isWait: false,
            email: '',
            pwd: '',
        };
        this.params = utils.parseParams(this.props.location.search).query as IParams;
    }
    params: IParams = {};
    render() {
        return (
            <Background>
                <Fragment>
                    {!this.state.isWait && (
                        <div className="box">
                            <div className="title">
                                <span>云&nbsp;梭&nbsp;|&nbsp;账&nbsp;号&nbsp;注&nbsp;册</span>
                                <div className="sm">邮箱注册一个新的账户</div>
                            </div>
                            <div className="content">
                                <Input placeholder="邮箱" onChange={(e: any) => this.setState({ email: e })} />
                                <Input placeholder="密码,至少6位字母数字特殊符号的组合" type="password" onChange={(e: any) => this.setState({ pwd: e })} />
                                <Button onClick={this.reg} className="login_btn" type="info">
                                    注册
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
                                <p>注册完成，请在邮箱完成激活。</p>
                                <p>激活码有效时间2小时。</p>
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
        if (!this.state.pwd || this.state.pwd.length < 6) {
            return Message.error('密码格式不正确');
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
