import React from 'react';
import './index.less';
import { Table, Pagination, Button, Input, Message, Dialog } from 'element-react';
import request from '../../services/request';
import QS from 'query-string';

interface iState {
    count: number;
    list: any[];
    dialogVisible: boolean;
    clientName: string;
    clientid: string;
}
export default class extends React.Component<any, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
            list: [],
            dialogVisible: false,
            clientName: '',
            clientid: '',
        };
        this.params = QS.parse(props.location.search);
    }
    params: any;
    columns = [
        {
            label: 'id',
            prop: 'id',
            width: 90,
        },
        {
            label: '客户端id',
            prop: 'clientid',
            width: 290,
        },
        {
            label: '名称',
            prop: 'name',
        },
        {
            label: '创建日期',
            width: 210,
            prop: 'createdAt',
        },
        {
            label: '操作',
            width: 90,
            render: (row: any) => {
                return (
                    <Button.Group>
                        <Button onClick={() => this.del(row.id)} type="danger" size="small">
                            删除
                        </Button>
                    </Button.Group>
                );
            },
        },
    ];

    render() {
        return (
            <div id="client">
                <div>
                    <Button className="btn_add" type="primary" icon="plus" onClick={this.handleClick} size="small">
                        新增
                    </Button>
                </div>
                <Table style={{ width: '100%' }} columns={this.columns} data={this.state.list} border={true} />
                <div className="foot">
                    <Pagination onCurrentChange={this.onCurrentChange} layout="prev, pager, next" pageSize={20} small={true} total={this.state.count} />
                </div>
                <Dialog title="添加新的项目" size="tiny" visible={this.state.dialogVisible} onCancel={() => this.setState({ dialogVisible: false })}>
                    <Dialog.Body>
                        <Input value={this.state.clientName} onChange={(e) => this.change1(e)} placeholder="给客户端添加昵称"></Input>
                        <div className="hang"></div>
                        <Input value={this.state.clientid} onChange={(e) => this.change2(e)} placeholder="请填入push用到的id"></Input>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.addClient()} type="primary">
                            添加
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
    componentDidMount() {
        this.getList();
    }
    change1(v: any) {
        this.setState({
            clientName: v,
        });
    }
    change2(v: any) {
        this.setState({
            clientid: v,
        });
    }
    onCurrentChange = (pageIndex: number) => {
        this.getList(pageIndex);
    };
    pageIndex = 1;
    async getList(pageIndex?: number) {
        if (pageIndex && !isNaN(pageIndex)) {
            this.pageIndex = pageIndex;
        }
        try {
            const data = await request.get('/project/client', { uuid: this.params.id, pageIndex: this.pageIndex });
            this.setState({
                count: data.count,
                list: data.rows,
            });
        } catch (error) {
            console.log(error);
        }
    }
    async del(id: number) {
        try {
            await request.post('/project/client/del', { id });
            Message.success('已删除');
            this.getList();
        } catch (error) {
            console.log(error.message);
            Message.error('删除失败');
        }
    }
    handleClick = () => {
        this.setState({ dialogVisible: true });
    };
    async addClient() {
        try {
            await request.post('/project/client/add', { name: this.state.clientName, clientid: this.state.clientid, uuid: this.params.id });
            this.setState({
                dialogVisible: false,
                clientName: '',
                clientid: '',
            });
            Message.success('添加成功');
            this.getList();
        } catch (error) {
            console.log(error.message);
            Message.error('添加失败');
        }
    }
}
