import React from 'react';
import ImageNewsComponent from './image_news_component';

export default class PCNewsImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    componentDidMount() {
        // let fetchOption = {method: 'Get'};
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, fetchOption).then(response => response.json()).then(json => this.setState({news: json}));
       
        //暂时先用静态数据
        let data = [{
            uniquekey:'1',//id
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片的src
            title:'新闻1',//标题名称
            author_name:'张应祥',//作者名称
        },{
            uniquekey:'2',//id
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片的src
            title:'新闻2',//标题名称
            author_name:'张应祥',//作者名称
        },{
            uniquekey:'3',//id
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片的src
            title:'新闻2',//标题名称
            author_name:'张应祥',//作者名称
        },{
            uniquekey:'4',//id
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片的src
            title:'新闻2',//标题名称
            author_name:'张应祥',//作者名称
        },{
            uniquekey:'5',//id
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片的src
            title:'新闻2',//标题名称
            author_name:'张应祥',//作者名称
        },{
            uniquekey:'6',//id
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片的src
            title:'新闻2',//标题名称
            author_name:'张应祥',//作者名称
        }]
        
        this.setState({news: data})
    }

    render() {
        const news = this.state.news;

        let newsImage = news.length ?
            <ImageNewsComponent news={news} imageWidth={this.props.imageWidth} cartTitle={this.props.cartTitle} justifyContent={this.props.justifyContent}/>
            : '正在加载';

        return (

            <div>{newsImage}</div>
        );
    }
}