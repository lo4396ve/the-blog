import React from 'react';
import {Switch, Redirect, Link} from 'react-router-dom';
import {RouteWithSubRoutes} from '../../router/index';
import Tabbar from '../../components/tabbar/index';
import Header from '../../components/Header/index';
import './basic.scss';
function Basic(props) {
    return (
        <div className="basic-layout">
            <Header></Header>
            <div className="content">
                <Switch>
                    {
                        props.routes.map(route => {
                            return (
                                <RouteWithSubRoutes {...route} key={route.path}/>
                            )
                        })
                    }
                    <Redirect from="/basic" to="/basic/home" />
                </Switch>
            </div>
            <Tabbar></Tabbar>
        </div>
    )
}

export default Basic;