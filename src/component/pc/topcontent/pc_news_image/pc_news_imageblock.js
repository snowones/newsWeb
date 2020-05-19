import React from 'react';
import ImageNewsComponent from './image_news_component';
import {api,host} from '../../../../until';
import './index.scss';

export default class PCNewsImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    componentDidMount() {
        //动态获取数据 根据传入得type
        let wenzhangType = this.props.type;
        /**
         * zyx
         * 2020/5/19
         * 拿到数据
         */
        api({
            url:host + 'newsSelectContentByType',
            args: {
                type:1,
                wenzhangType,
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
                uniquekey: data[i].id,
                thumbnail_pic_s: img[0],
                title: data[i].title,
                author_name: data[i].name,
            });
        }
        this.setState({
            news:listData
        })
    }

    render() {
        const news = this.state.news;

        let newsImage = news.length ?
            <ImageNewsComponent news={news} imageWidth={this.props.imageWidth} cartTitle={this.props.cartTitle} justifyContent={this.props.justifyContent}/>
            : '正在加载';

        return (

            <div className='pc_news_imgblock'>{newsImage}</div>
        );
    }
}