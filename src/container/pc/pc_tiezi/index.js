import React, { Component } from 'react';
import './index.scss';
import {Link} from 'react-router';

import { List, Avatar, Icon } from 'antd';


class Tiezi extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render() {
        const listData = [];
        for (let i = 0; i < 23; i++) {
        listData.push({
            id: i,
            href: 'http://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
        }

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
                    // footer={
                    //     <div>
                    //         <b>ant design</b> footer part
                    //     </div>
                    // }
                    renderItem={item => (
                        <Link to={`tieziDetails/${item.id}`} target='_blank'>
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
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
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

export default Tiezi;