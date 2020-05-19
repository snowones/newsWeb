import React, { Component } from 'react';
import './index.scss';

import {Button,Icon,Input,Row,Col,Upload,Modal,Select,message} from 'antd';
import {api,host} from '../../../until'
const { TextArea } = Input;
const { Option } = Select;


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


class Fenxiang extends Component {
    constructor(props){
        super(props);
        this.state = {
            type:1,//本页面展示内容全部根据type切换
            title:'',//标题
            subtitle:'',//大纲
            content:'',//内容
            img:[],//图片
            previewVisible: false,
            previewImage: '',
            fileList: [],
            wenzhangType:1,//文章类别选择框，默认为第一个
        }
    }

    componentDidMount(){
    }

     /**
     * zyx
     * 2020/5/18
     * 切换type
     */
    changeType = (type) =>{
        console.log(type)
        console.log(this.state.fileList);
        this.setState({
            type,
            title:'',//标题
            subtitle:'',//大纲
            content:'',//内容
            img:[],//图片
            previewVisible: false,
            previewImage: '',
            fileList: [],
        })
    }

    /**
     * zyx
     * 2020/5/18
     * 根据type展示header
     */
    showHeader =()=>{
        let {type} = this.state;
        if(type == 1){
            return (
                <Button.Group size='large'>
                    <Button type="primary" onClick ={()=>{this.changeType(1)}}>
                        <Icon type="left" />
                        分享幼儿防治信息
                    </Button>
                    <Button type="normal" onClick ={()=>{this.changeType(2)}}>
                        交流幼儿防治信息
                        <Icon type="right" />
                    </Button>
                </Button.Group>
            )
        }else if(type == 2){
            return (
                <Button.Group size='large'>
                    <Button type="normal" onClick ={()=>{this.changeType(1)}}>
                        <Icon type="left" />
                        分享幼儿防治信息
                    </Button>
                    <Button type="primary" onClick ={()=>{this.changeType(2)}}>
                        交流幼儿防治信息
                        <Icon type="right" />
                    </Button>
                </Button.Group>
            )
        }
    }

    /**
     * zyx
     * 2020/5/15
     * type1 展示发表文章得表单 type2展示发表帖子得表单
     */
    showform = ()=>{
         //上传按钮
         const { previewVisible, previewImage, fileList } = this.state;
         const uploadButton = (
             <div>
                 <Icon type="plus" />
                 <div className="ant-upload-text">Upload</div>
             </div>
        );
        //分类处理
        let {type} = this.state;
        let content = {}
        if(type == 1){
            content.title = '文章标题';
            content.titleWarn = '请输入文章标题';
            content.subtile = '文章大纲';
            content.subtitleWarn = '请输入文章大纲';
            content.content = '文章内容';
            content.congtentWarn = '请输入文章内容';
            content.img = '文章图片'
            content.imgLength = 1;
            content.Button = '发表文章';
        }else if(type == 2){
            content.title = '帖子标题';
            content.titleWarn = '请输入帖子标题';
            content.subtile = '帖子类别';
            content.subtitleWarn ='请输入帖子类别';
            content.content = '帖子内容';
            content.congtentWarn = '请输入帖子内容';
            content.img = '帖子图片'
            content.imgLength = 3;
            content.Button = '发表帖子';
        }

        return(
            <div>
                <Row className ='item-img'>
                    <Col span={4}>{content.img}</Col>
                    <Col span={20} >
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            beforeUpload = {this.beforeUpload}
                            onRemove={this.onRemove}
                            >
                            {fileList.length >= content.imgLength ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                </Row>
                <Row className ='item'>
                    <Col span={4}>{content.title}</Col>
                    <Col span={20} ><Input value = {this.state.title} onChange = {(e) => {this.changeInput('title',e)} }  placeholder={content.titleWarn} /></Col>
                </Row>
                <Row className ='item'>
                    <Col span={4}>{content.subtile}</Col>
                    <Col span={20} ><Input value = {this.state.subTitle} onChange = {(e) => {this.changeInput('subTitle',e)} }  placeholder={content.subtitleWarn} /></Col>
                </Row>
                <Row className ='item'>
                    <Col span={4}>{content.content}</Col>
                    <Col span={20} ><TextArea  autoSize={{ minRows: 6, maxRows: 20 }} value = {this.state.content} onChange = {(e) => {this.changeInput('content',e)} }  placeholder={content.congtentWarn} /></Col>
                </Row>
                <Row className ='item' style={{marginTop:'30px'}}>
                    <Col offset={6} span={12}> 
                        <Button type="primary" block onClick={()=>{this.submit()}}>
                            {content.Button}
                        </Button>
                    </Col>
                </Row>
               
            </div>
        )

    }

    /**
     * zyx
     * 2020/5/18
     * 选择文章类别
     */
    showWenzhangType = ()=>{
        let {type} = this.state;
        if(type == 1){
            return(
                <Row className ='item'>
                    <Col span={4}>文章类目</Col>
                    <Col span={5} >
                    <Select defaultValue="幼儿生理知识" style={{ width: 220 }} onChange={this.selectChange}>
                        <Option value="1">幼儿生理知识</Option>
                        <Option value="2">幼儿疾病知识</Option>
                        <Option value="3">近日热搜</Option>
                    </Select>
                    </Col>
                </Row>
            )
        }
    }

    /**
     * zyx
     * 选择的值
     */
    selectChange = (value)=>{
        this.setState({
            wenzhangType:value,
        })
    }

    /**
	 * ZYX
	 * 2019.10.21
	 * input框内数据实时修改
	 */
	//input onchange触发
	changeInput = (type, e) => {
		this.setState({
			//setState 里 key如果传一个变量会自动被处理为一个字符串而不是变 解决方案 给key加一个[]
			[type] : e.target.value
		})
    }

    //上传图片
    
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
  
    //上传照片触发
    handleChange =async ({file,fileList})=> {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({ 
            fileList,
        })
    };

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
            let msg = response.msg;
            let img = this.state.img;
            img.push(msg);
            this.setState({
                img
            },()=>{
                console.log(this.state.img);
            })
		})
    }

    /**
     * zyx/2020/5/18
     * 上传图片这里有个bug
     * 我再上传图片前的回调函数里把图片上传到了oss中
     * 但是删除方法里我无法知道我删除的是第几个图片
     * 也就无法删除img数组内被删除的图片链接
     */

    onRemove = file => {
        console.log(file);
    };


    /**
     * zyx
     * 2020/5/18
     * 点击上传 如果type是1 就是上传文章 如果type是2 就是上传帖子
     */
    submit = ()=>{
        let {type,title,subTitle,content,img,wenzhangType} = this.state;
        if( !type || !title || !subTitle || !content || !img || !wenzhangType ) {
            message.warning('请把信息输入完整');
            return 0;
        }
        

        // if(type == 1){
        //     api({
        //         url:host + 'xxx',
        //         args: {
        //             id
        //         },
        //         callback: (res) => {

        //         }
        //     });

        // }else if(type == 2){
        //     api({
        //         url:host + 'xxx',
        //         args: {
        //             id
        //         },
        //         callback: (res) => {

        //         }
        //     });

        // }
        
        
    }
   

    render() {
       
        return (
            <div className='fenxiang_container'>
                <div className='header'>
                    {this.showHeader()}
                </div>
                <div className='form'>
                    {this.showWenzhangType()}
                    {this.showform()}
                </div>
            </div>
        );
    }
}

export default Fenxiang;