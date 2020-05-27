import React from 'react';
import {Route} from 'react-router-dom';
import loadable from "@loadable/component";
// import Basic from '../pages/basic/basic';
// import Home from '../pages/basic/components/home/index';
const Basic = loadable(() => import(/* webpackChunkName: 'basic' */ "../pages/basic/basic"));
const Home = loadable(() => import(/* webpackChunkName: 'basic' */ "../pages/basic/components/home/index"));
const MyHome = loadable(() => import(/* webpackChunkName: 'basic' */ "../pages/basic/components/MyHome/index"));
const routes = [
    {
      path: "/basic",
      component: Basic,
      routes: [
        {
          path: "/basic/home",
          component: Home,
          routes: [
            {
              path: "/basic/home/myhome",
              component: MyHome
            }
          ]
        }
      ]
    },
];

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
            )}
        />
    )
    
}

export {
    routes,
    RouteWithSubRoutes
}