import React from 'react';
import PCNewsComponent from './pc_news_Component';
import {api,host} from '../../../../until';

export default class PCNewsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    //页面渲染后触发
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
                title: data[i].title,
            });
        }
        this.setState({
            news:listData
        })
    }


    render() {
        const news = this.state.news;
        //看news的长度是否为0，字符串长度为0则是false表示未加载到数据，为其他值则true加载到数据
        const newsCard = news.length ?
            <PCNewsComponent news={news}/>
            : '正在加载';

        return (
            <div>
                {newsCard}
            </div>

        );
    }
}