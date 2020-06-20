import React from 'react';
import {Route} from 'react-router-dom';
import loadable from "@loadable/component";
const Basic = loadable(() => import(/* webpackChunkName: 'basic' */ "../pages/basic/basic"));
const Home = loadable(() => import(/* webpackChunkName: 'basic' */ '../pages/home/index'))
const Me = loadable(() => import(/* webpackChunkName: 'basic' */ '../pages/me/index'))
import homeIcon from '../assets/images/home.png'
import homeIconActive from '../assets/images/rhome.png'
import meIcon from '../assets/images/new-order.png'
import meIconActive from '../assets/images/new-rorder.png'

const tabbarRouter = [
  {
    path: "/basic/home",
    tabName: '首页',
    component: Home,
    icon: homeIcon,
    iconActive: homeIconActive
  },
  {
    path: "/basic/me",
    tabName: '我的',
    component: Me,
    icon: meIcon,
    iconActive: meIconActive
  }
]
const routes = [
    {
      path: "/basic",
      component: Basic,
      routes: tabbarRouter
    },
];

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
        />
    )
}

export {
    routes,
    tabbarRouter,
    RouteWithSubRoutes
}