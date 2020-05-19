import React from 'react';
import {Icon, message,  Form, Input, Button,Upload,Modal} from 'antd';

import {api,host} from '../../../until';

//上传图片使用
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

//注册表单组件
class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            avatar:'',//用户头像
            //上传头像用的
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
    }

    //处理注册提交表单
    handleRegisterSubmit = (e)=> {
        //页面开始向API进行提交数据
        //阻止submit事件的默认行为
        e.preventDefault();

        this.props.form.validateFields((err, formData) => {
            if (!err) {
                console.log('Received values of form: ', formData);

                let name = formData.r_userName;
                let account  = formData.r_userAccount;
                let password  = formData.r_confirmPassword;
                //判断头像是否上传
                let {avatar} = this.state;
                if(!avatar){
                    message.warn('请上传头像');
                    return 0;
                }

                
                api({
                    url:host +'newsCreateUser',
                    args: {
                        name,
                        account,
                        password,
                        avatar
                    },
                    callback: (res) => {
                        console.log(res);
                        if(res.code == '400'){
                            message.warn("注册失败，该账户已存在");
                        }else{
                            message.success("注册成功");
                            //设置模态框消失
                            this.props.setModalVisible(false);
                        }
                    }
                });

            }
        })
    }

    //注册验证确认密码框输入的密码两次是否一样
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }

    //注册检验密码
    checkConfirm = (rule, value, callback)=> {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['r_confirmPassword'], {force: true});
        }
        callback();
    }


    //上传图片弹窗
    handleCancel = () => this.setState({ previewVisible: false });
    //预览图片
    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };
    
    //上传图片
    handleChange = ({ fileList }) => this.setState({ fileList });

    /**
	 * zyx
	 * 2019.10.21
	 * 上传文件之前的钩子，参数为上传的文件
	 */
	beforeUpload = (file) => {
		let formData = new FormData();
		formData.append('file', file);
		fetch('http://182.92.64.245/tp5/public/index.php/index/index/savaImgToOss', {
			method:'post',
			body: formData
		}).then(response => response.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
            let img = response.msg;
            this.setState({
                avatar:img
            },()=>{
                console.log(this.state.avatar);
            })
		})
    }

    render() {
        //表单
        let {getFieldDecorator} = this.props.form;
        //上传头像
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Form onSubmit={this.handleRegisterSubmit}>
                <Form.Item lable="昵称">
                    {getFieldDecorator('r_userName', {
                        rules: [{required: true, message: '请输入您的昵称!'}],
                    })
                    (<Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder='请输入您的昵称'/>)}
                </Form.Item>

                <Form.Item lable="账户">
                    {getFieldDecorator('r_userAccount', {
                        rules: [{required: true, message: '请输入您的账户!'}],
                    })
                    (<Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder='请输入您的账户'/>)}
                </Form.Item>

                <Form.Item lable="密码">
                    {getFieldDecorator('r_password', {
                        rules: [{required: true, message: '请输入您的密码'}, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input prefix={<Icon type="lock"
                                             style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type='password' placeholder='请输入您的密码'/>)}
                </Form.Item>

                <Form.Item lable="确认密码">
                    {getFieldDecorator('r_confirmPassword', {
                        rules: [{
                            required: true, message: '请确认您的密码!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock"
                                             style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type='password' placeholder='请再次输入您的密码'/>
                    )}
                </Form.Item>

                <Form.Item>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        beforeUpload = {this.beforeUpload}
                        >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>注册</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;