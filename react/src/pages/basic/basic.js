import React from 'react';
import {Switch, Redirect, Link} from 'react-router-dom';
import {RouteWithSubRoutes} from '../../router/index';
import Tabbar from '../../components/tabbar/index';
import './basic.scss';
function Basic(props) {
    return (
        <div className="basic-layout">
            <div className="header">header</div>
            <Link to="/basic/home">home</Link>
            <Switch>
                {
                    props.routes.map(route => {
                        console.log('route', route)
                        return (
                            <RouteWithSubRoutes {...route} key={route.path}/>
                        )
                    })
                }
                {/* <Redirect from="/basic" to="/basic/home" /> */}
            </Switch>
            
            <Tabbar></Tabbar>
        </div>
    )
}

export default Basic;