import React from 'react';
import {Tabs, Modal} from 'antd';
import WrappedRegisterForm from './WrappedRegisterForm'
import WrappedLoginForm from './WrappedLoginForm'

export default class LoginRegisterModal extends React.Component {
    //注册登录弹窗
    handleCancel = () => {
        this.props.setModalVisible(false);
    }

    render(){

        return(

            <Modal title="用户中心" visible={this.props.visible}
                   onCancel={this.handleCancel}
                   onOk={this.handleCancel}>
                <Tabs type="card">
                    <Tabs.TabPane tab='登录' key='1'>
                        <WrappedLoginForm login={this.props.login} setModalVisible={this.props.setModalVisible}/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='注册' key='2'>
                        <WrappedRegisterForm setModalVisible={this.props.setModalVisible}/>
                    </Tabs.TabPane>

                </Tabs>
            </Modal>
        );
    }
}














