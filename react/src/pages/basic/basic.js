import React from 'react';
import {Switch, Redirect, Link} from 'react-router-dom';
import {RouteWithSubRoutes} from '../../router/index';
function Basic(props) {
    return (
        <div className="basic-layout">
            <div>header</div>
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
            
            <div>footer</div>
        </div>
    )
}

export default Basic;