import React from 'react';
import {Row, Col, Tabs} from 'antd';
import {Carousel} from 'antd';
import img1 from '../../static/images/carousel_1.jpg';
import img2 from '../../static/images/carousel_2.jpg';
import img3 from '../../static/images/carousel_3.jpg';
import img4 from '../../static/images/carousel_4.jpg';
import PCNewsBlock from '../../component/pc/topcontent/pc_news_card/pc_news_block';
import PCNewsImageBlock from '../../component/pc/topcontent/pc_news_image/pc_news_imageblock';
import PCNewsImageSingle from '../../component/pc/topcontent/pc_news_singleImage/pc_news_imgeSingle';
import './pc_news_container.css'

export default class PCNewsContainer extends React.Component {
    render() {

        return (
            <Row>
                <Col span={2}/>
                <Col span={21}>
                    <Row className='top_news'>
                        <Col span={8}>
                            <div className='top_left'>
                                <Carousel autoplay>
                                    <div><img src={img1}/></div>
                                    <div><img src={img2}/></div>
                                    <div><img src={img3}/></div>
                                    <div><img src={img4}/></div>
                                </Carousel>
                                <PCNewsImageBlock count={6} type='4' width='100%' imageWidth='112px'
                                                  cartTitle='皮肤疾病' justifyContent='space-around'/>
                            </div>
                        </Col>

                        <Col span={10}>
                            <div className='top_center'>
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab='肠道疾病' key='1'>
                                        <PCNewsBlock count={30} type='5' width='100%' bordered='false'/>
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Col>

                        <Col span={6}>
                            <div className='top_right'>
                                <PCNewsImageSingle width='100%' ImageWidth='100px' type='3' count={6}
                                                   title='口腔疾病'/>
                            </div>
                        </Col>

                    </Row>

                    <Row>

                        <PCNewsImageBlock count={16} type='2' width='100%' imageWidth='112px' cartTitle='传染类疾病'
                                          justifyContent='space-start'/>
                        <PCNewsImageBlock count={16} type='1' width='100%' imageWidth='112px' cartTitle='呼吸道疾病'
                                          justifyContent='space-start'/>
                    </Row>

                </Col>
                <Col span={1}/>
            </Row>
        );

    }
}