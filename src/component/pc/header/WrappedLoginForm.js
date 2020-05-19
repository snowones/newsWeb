import React from 'react';
import {Icon,Form, Input, Button,Checkbox} from 'antd';
import './pc_header.css';
import {api,host} from '../../../until';
//登录表单组件
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasUser: ''};
    }

    //motal框中的处理登录提交表单
    handleLoginSubmit = (e) =>{
        //页面开始向API进行提交数据
        //阻止submit事件的默认行为
        e.preventDefault();
        this.props.form.validateFields((err, formData) => {
            if (!err) {
                console.log('Received values of form: ', formData);

                // api({
                //     url:host +'newsCreateUser',
                //     args: {
                //         name,
                //         account,
                //         password,
                //         avatar
                //     },
                //     callback: (res) => {
                //         console.log(res);
                //         if(res.code == '400'){
                //             message.warn("注册失败，该账户已存在");
                //         }else{
                //             message.success("注册成功");
                //             //设置模态框消失
                //             this.props.setModalVisible(false);
                //         }
                //     }
                // });
            }
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleLoginSubmit}>

                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true,
                            message: 'Please input your username!'
                        }],
                    })(
                        <Input prefix={<Icon type="user"
                                             style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Username"/>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            message: 'Please input your Password!'
                        }],
                    })(
                        <Input prefix={<Icon type="lock"
                                             style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password" placeholder="Password"/>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <span>{this.state.hasUser}</span>
                    <Button type="primary" htmlType="submit"
                            className="login-form-button">
                        Log in
                    </Button>

                </Form.Item>
            </Form>
        );
    }

}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;