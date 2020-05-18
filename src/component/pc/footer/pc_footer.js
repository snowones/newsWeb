import React from 'react';
import {Row,Col} from 'antd';


export default class PCFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <footer>
                <Row>
                    <Col span={2}/>
                    <Col span={20} style={{ textAlign:'center'}}>
                        &copy;&nbsp;2020 幼儿疾病防治。PPYO.
                    </Col>
                    <Col span={2}/>
                </Row>
            </footer>
        );
    }
}