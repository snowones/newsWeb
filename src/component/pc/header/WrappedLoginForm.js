import React from 'react';
import {Icon,Form, Input, Button,Checkbox,message} from 'antd';
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

                let {account,password} = formData;

                api({
                    url:host +'newsLogin',
                    args: {
                        account,
                        password,
                    },
                    callback: (res) => {
                        console.log(res);
                        if(res.code == '401'){
                            message.warn("登录失败，该账户不存在");
                            return 0;
                        }else if(res.code == '402'){
                            message.warn("登录失败，密码错误");
                            return 0;
                        }else{
                            
                                let userLogin = {userName: res.msg[0].name, userId: res.msg[0].id,userAvatar:res.msg[0].avatar};
                                this.props.login(userLogin);
                                //设置模态框消失
                                this.props.setModalVisible(false);
                           
                        }
                    }
                });
            }
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleLoginSubmit}>

                <Form.Item>
                    {getFieldDecorator('account', {
                        rules: [{
                            required: true,
                            message: 'Please input your account!'
                        }],
                    })(
                        <Input prefix={<Icon type="user"
                                             style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="account"/>
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