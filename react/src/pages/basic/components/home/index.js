import React, {useState, useEffect} from 'react';
import {Switch, Redirect, Link} from 'react-router-dom';
import {RouteWithSubRoutes} from '../../../../router/index';
function Home (props) {
    return (
        <div className="home">
            <Link to="/basic/home/myhome">myhome</Link>
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
        </div>
    )
}
export default Home;