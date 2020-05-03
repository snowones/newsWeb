import React from 'react';
import ImageSingleComponent from './imageSingle_component'

 export default class PCNewsImageSingle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    //页面渲染之前
    componentDidMount() {
        // let fetchOption = {method: 'GET'};
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, fetchOption).then(response => response.json()).then(json => this.setState({news: json}));
    
        //先用静态数据
        let data = [{
            uniquekey:'1',
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片链接
            title:'lgd真菜啊啊啊啊啊啊啊啊啊啊',//标题
            realtype:'ti10',//新闻类别
            author_name:'张应祥',//作者名称
        },
        {
            uniquekey:'2',
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片链接
            title:'lgd真菜啊啊啊啊啊啊啊啊啊啊',//标题
            realtype:'ti10',//新闻类别
            author_name:'张应祥',//作者名称
        },
        {
            uniquekey:'3',
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片链接
            title:'lgd真菜啊啊啊啊啊啊啊啊啊啊',//标题
            realtype:'ti10',//新闻类别
            author_name:'张应祥',//作者名称
        },
        {
            uniquekey:'4',
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片链接
            title:'lgd真菜啊啊啊啊啊啊啊啊啊啊',//标题
            realtype:'ti10',//新闻类别
            author_name:'张应祥',//作者名称
        },
        {
            uniquekey:'5',
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片链接
            title:'lgd真菜啊啊啊啊啊啊啊啊啊啊',//标题
            realtype:'ti10',//新闻类别
            author_name:'张应祥',//作者名称
        },
        {
            uniquekey:'6',
            thumbnail_pic_s:'https://1978246522-max.oss-cn-hangzhou.aliyuncs.com/u%3D1717847492%2C1311910060%26fm%3D26%26gp%3D0.jpg',//图片链接
            title:'lgd真菜啊啊啊啊啊啊啊啊啊啊',//标题
            realtype:'ti10',//新闻类别
            author_name:'张应祥',//作者名称
        },]

        this.setState({news:data})
    }

    render(){
        const news=this.state.news;
        const newsList=news.length?
          <ImageSingleComponent news={news} ImageWidth={this.props.ImageWidth} width={this.props.width} title={this.props.title}/>
            :'正在加载';

        return(
            <div >
                {newsList}
            </div>
        );
    }
}