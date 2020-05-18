import React, {Component} from 'react';

import './App.css';
import PCApp from './container/pc/pc_app';
import MobileApp from './container/mobile/mobile_app';
import MediaQuery from 'react-responsive';
import {Router, Route,hashHistory,IndexRoute} from 'react-router';

import MobileNewsDetail from './container/mobile/mobile_news_detail';
import PCNewsContainer from './container/pc/pc_news_container';
//帖子模块
import Tiezi from './container/pc/pc_tiezi';
//文章模块
import Wenzhang from './container/pc/pc_wenzhang';
//分享模块
import Fenxiang from './container/pc/pc_fenxiang';
//文章详情模块
import WenzhangDetail from './container/pc/pc_wenzhang_detail';
//帖子详情
import TieziDetail from './container/pc/pc_tiezi_detail'



class App extends Component {
    render() {
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Route path='/' component={PCApp}>
                            <IndexRoute component={PCNewsContainer}/>
                            <Route path='/top' component={PCNewsContainer}/>
                            <Route path='/tiezi' component={Tiezi}/>
                            <Route path='/wenzhang' component={Wenzhang}/>
                            <Route path='/fenxiang' component={Fenxiang}/>
                            <Route path='/details/:uniquekey' component={WenzhangDetail}/>
                            <Route path='/tieziDetails/:uniquekey' component={TieziDetail}/>
                        </Route>
                    </Router>
                </MediaQuery>

                <MediaQuery query='(max-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Route path='/' component={MobileApp}/>
                        <Route path='/details/:uniquekey' component={MobileNewsDetail}/>
                    </Router>

                </MediaQuery>
            </div>
        );
    }
}

export default App;
