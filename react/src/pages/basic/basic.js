import React, {useState} from 'react';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import Home from './components/home/index'
function Basic(props) {
    return (
        <div className="basic-layout">
            <div>header</div>
            <Switch>
                <Route path="/basic/home" component={Home}/>
                {/* <Redirect from="/" to="/basic" exact={true} /> */}
            </Switch>
            
            <div>footer</div>
        </div>
    )
}

export default Basic;