import React from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import {routes, RenderRoute} from './router/index';
import Basic from './pages/basic/basic'

const App = () => {
    return (
        <div className='app'>
            <Link to='/basic/home'>link</Link>
            <Switch>
                <Route path="/basic" component={Basic}/>
                {/* {
                    routes.map(route => {
                        console.log('route', route)
                        return (
                            <RenderRoute {...route} key={route.path}/>
                        )
                    })
                } */}
                <Redirect from="/" to="/basic" exact={true} />
            </Switch>
        </div>
    )
}

export default App;