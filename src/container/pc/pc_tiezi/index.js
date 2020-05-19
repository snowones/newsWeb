import React, { Component } from 'react';
import './index.scss';
import {Link} from 'react-router';

import { List, Avatar, Icon,Col,Row} from 'antd';
import {api,host} from '../../../until'


class Tiezi extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataList:[],//页面展示得全部数据

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
                type:2,
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
            <div className='tiezi-container' style={{margin:"30px 100px"}}>
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
                        <Link to={`tieziDetails/${item.id}`} target='_blank'>
                            <List.Item
                                key={item.title}
                                actions={[
                                <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                <IconText type="message" text="2" key="list-vertical-message" />,
                                ]}
                            >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                description={item.description}
                                />
                                {item.content}
                                <div>
                                    <Row>
                                        <Col span={6}> 
                                            <img
                                                width={272}
                                                alt="logo"
                                                src={item.img[0]}
                                            />
                                        </Col>
                                        <Col span={6}> 
                                            <img
                                                width={272}
                                                alt="logo"
                                                src={item.img[1]}
                                            />
                                        </Col>
                                        <Col span={6}> 
                                            <img
                                                width={272}
                                                alt="logo"
                                                src={item.img[2]}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </List.Item>
                            
                        </Link>
                    )}
                />
            </div>
        );
    }
}

export default Tiezi;