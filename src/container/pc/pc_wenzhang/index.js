import React, { Component } from 'react';
import './index.scss';
import {Link} from 'react-router';

import { List, Avatar, Icon} from 'antd';
import {api,host} from '../../../until'


class Wenzhang extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
        }
    }

    componentDidMount(){
         /**
         * zyx
         * 2020/5/19
         * 拿到数据
         */
        api({
            url:host + 'newsSelectContentByType',
            args: {
                type:1,
            },
            callback: (res) => {
                console.log(res);
                this.showData(res);
            }
        });

    }

      /**
     * zyx
     * 2020/5/19
     * 处理数据
     */
    showData = (data)=>{
        let listData = [];
        for (let i = 0; i < data.length; i++) {
            let img = JSON.parse(data[i].img);
            listData.push({
                id: data[i].id,
                title: data[i].title + '：' +data[i].subtitle,
                avatar: data[i].avatar,
                description: data[i].title + '：' +data[i].subtitle,
                content:data[i].content,
                img,
            });
        }
        this.setState({
            dataList:listData
        })
    }

    render() {
        let listData = this.state.dataList;

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return (
            <div className='tiezi-container'>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <Link to={`details/${item.id}`} target='_blank'>
                            <List.Item
                                key={item.title}
                                actions={[
                                <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                <IconText type="message" text="2" key="list-vertical-message" />,
                                ]}
                                extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={item.img[0]}
                                />
                                }
                                
                            >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                // title={<a href={tieziDetails}>{item.title}</a>}
                                description={item.description}
                                />
                                {item.content}
                            </List.Item>
                            
                        </Link>
                    )}
                />
            </div>
        );
    }
}

export default Wenzhang;