import React, { Component } from 'react';
import './index.scss';

import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
import moment from 'moment';

import {api,host} from '../../../until'
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
            comments: [],
            submitting: false,
            value: '',
            data:{},
        }
    }

    componentDidMount(){
        //拿到帖子数据
        let id = this.props.params.uniquekey;
        console.log(this.props.params.uniquekey);
        api({
            url:host + 'newsSelectContentByType',
            args: {
                id,
            },
            callback: (res) => {
                console.log(res);
                this.showWenzhangData(res);
            }
        });

        this.onChange();

    }

    onChange = ()=>{
        let pid = this.props.params.uniquekey;
        api({
            url:host + 'newsSelectAllComment',
            args: {
                pid,
            },
            callback: (res) => {
                console.log(res);
                this.showCommentData(res);
            }
        });
    }

   /**
     * zyx
     * 2020/5/19
     * 处理数据
     */
    showWenzhangData = (data)=>{
        //临时存放数据
        let handleData = {};
        handleData.content =data[0].content;
        this.setState({
            data:handleData
        })
    }

    /**
     * zyx
     * 2020/5/19
     * 处理评论数据
     */
    showCommentData = (data) =>{
        let tempData = [];
        for (let i = 0; i < data.length; i++) {
            tempData.push({
                id: data[i].id,
                author: data[i].name,
                avatar: data[i].avatar,
                content: data[i].content,
                datatime:data[i].create_time,
            });
        }
        this.setState({
            comments:tempData
        })
    }


    insertCommentData = ()=>{

        let user_id = localStorage.userId;
        let pid = this.props.params.uniquekey;
        let comment = this.state.value;
        if(!user_id){
            message.warn("请先登录");
            return 0;
        }
        /**
         * zyx
         * 2020/5/19
         * 插入评论
         */
        api({
            url:host + 'newsInsertComment',
            args: {
                user_id,
                pid,
                content:comment,
            },
            callback: (res) => {
                console.log(res);
                this.onChange();
                this.setState({
                    submitting: false,
                    value: '',
                });
            }
        });
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        
        //动画暂停
        setTimeout(() => {

            this.insertCommentData();

        }, 1000);
    };
    
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value,data } = this.state;
        let {userName,userAvatar } = localStorage;
        return (
            <div className='tiezi_detail_container'>
                <div style={{marginBottom:'30px'}}>
                    {data.content}
                </div>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                        src={userAvatar}
                        alt={userName}
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