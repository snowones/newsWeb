import React from 'react';
import PCNewsComponent from './pc_news_Component';

export default class PCNewsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    //页面渲染后触发
    componentDidMount() {
        // let fetchOption = {method: 'GET'};
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, fetchOption).then(response => response.json()).then(json => this.setState({news: json}));
       
        //先渲染静态
        let data = [{
            uniquekey:'1',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'2',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        },
        {
            uniquekey:'3',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'4',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        },
        {
            uniquekey:'5',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'6',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        },
        {
            uniquekey:'7',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'8',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        },
        {
            uniquekey:'9',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'10',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        },
        {
            uniquekey:'11',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'12',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        },
        {
            uniquekey:'13',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'1',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        },
        {
            uniquekey:'14',//id
            title:'今日重磅新闻：美国新馆肺炎突破100w了！！',//大标题 比较长的那种
        },
        {
            uniquekey:'15',//id
            title:'国际疫情已到300w，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',//大标题 比较长的那种
        }]
        this.setState({news:data})
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