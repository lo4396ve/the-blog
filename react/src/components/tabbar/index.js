import React, {useState, useEffect} from 'react';
import {withRouter, useRouteMatch} from 'react-router-dom';
import {tabbarRouter} from '../../router/index';
import './index.scss';
// import icon from './home.png'

function Tabbar(props) {
    console.log('tabbarRouter', tabbarRouter);
    const match = useRouteMatch();
    console.log('match', match);
    useEffect(() => {
        // Update the document title using the browser API
        
    });
    return (
        <div className="tabbar">
            {
                tabbarRouter.map(item => {
                    return (
                        <div className="tab-item" key={item.path}>
                            <img className="tab-icon" src={item.icon} />
                            <div className="tab-name">{item.tabName}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Tabbar;