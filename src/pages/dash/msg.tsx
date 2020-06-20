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
            label: '消息标题',
            prop: 'title',
            width: 200,
        },
        {
            label: '消息内容',
            prop: 'txts',
        },
        {
            label: '链接',
            prop: 'link',
            width: 200,
        },
        {
            label: '创建日期',
            width: 210,
            prop: 'createdAt',
        },
    ];

    render() {
        return (
            <div id="msg">
                <Table style={{ width: '100%' }} columns={this.columns} data={this.state.list} border={true} />
                <div className="foot">
                    <Pagination onCurrentChange={this.onCurrentChange} layout="prev, pager, next" pageSize={20} small={true} total={this.state.count} />
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getList();
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
            const data = await request.get('/msg', { uuid: this.params.id, pageIndex: this.pageIndex });
            this.setState({
                count: data.count,
                list: data.rows,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
