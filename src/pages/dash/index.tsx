/**
 * 首页
 */
import React from 'react';
import './index.less';

interface IForm {
    [index: string]: string;
    title: string;
    target: string;
}
interface iState {
    model: any | null;
    total: number;
    list: any[];
    showEdt: boolean;
    form: IForm;
}

export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: null,
            total: 0,
            list: [],
            showEdt: false,
            form: {
                title: '',
                target: '',
            },
        };
    }

    render() {
        return <div id="dash">首页</div>;
    }
}
