import React, { Component } from 'react';
import './index.scss';

import { Comment, Avatar, Form, Button, List, Input,Tooltip } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

//输入评论列表
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);
//输入评论框
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);




class TieziDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [{
                author:'张应祥',
                avatar:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                content:'1111',
                datetime:'一天前',
            }],
            submitting: false,
            value: '',
        }
    }

    componentDidMount(){

    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                    author: 'Han Solo',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p>{this.state.value}</p>,
                    datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            },()=>{
                console.log(this.state)
            });
        }, 1000);
    };
    
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;
        return (
            <div className='tiezi_detail_container'>
                <div style={{marginBottom:'30px'}}>
                    内容正在加载中。。
                </div>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                        />
                    }
                />
            </div>
        );
    }
}

export default TieziDetail;