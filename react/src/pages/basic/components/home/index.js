import React, {useState, useEffect} from 'react';
import {Switch, Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux'
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

function mapStateToProps(state) {
    console.log('mapStateToProps', state);
    const {global} = state;
    return {global}
}
export default connect(mapStateToProps)(Home);