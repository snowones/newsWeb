import React from 'react';
import Logout from './LogoutComponent';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router';
export default class Nav extends React.Component{
    render(){
        //判断用户是否登录，用户登录就显示个人中心和退出按钮
        //用户没有登录就显示注册/登录按钮
        const userShow = this.props.hasLogined ?
            <Menu.Item key="logout">
                <Logout logout={this.props.logout} userName={this.props.userName}/>
            </Menu.Item> :
            <Menu.Item key='register'>
                <Icon type='appstore'/>注册/登录
            </Menu.Item>;

        return(
            <Menu mode="horizontal" selectedKeys={[this.props.current]}
                  onClick={this.props.menuItemClick}>
                <Menu.Item key="top">
                    <Link to='/top'>
                        <Icon type="appstore"/>主页
                    </Link>
                </Menu.Item>

                <Menu.Item key="wenzhang">
                    <Link to='/wenzhang'>
                        <Icon type="appstore"/>疾病防治信息浏览
                    </Link>
                </Menu.Item>

                <Menu.Item key="tiezi">
                    <Link to='/tiezi'>
                        <Icon type="appstore"/>交流疾病防治信息
                    </Link>
                </Menu.Item>

                <Menu.Item key="fenxiang">
                    <Link to='/fenxiang'>
                        <Icon type="appstore"/>分享疾病防治信息
                    </Link>
                </Menu.Item>
                {userShow}
            </Menu>

        );
    }
}