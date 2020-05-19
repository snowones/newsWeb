import React from 'react';
import ImageSingleComponent from './imageSingle_component';
import {api,host} from '../../../../until';

 export default class PCNewsImageSingle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {news: ''};
    }

    //页面渲染之前
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
                realtype:'口腔疾病'
            });
        }
        this.setState({
            news:listData
        })
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