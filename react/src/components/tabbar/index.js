import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {tabbarRouter} from '../../router/index';
import './index.scss';
// import icon from './home.png'

function Tabbar(props) {
    const location = useLocation();
    const history = useHistory();
    const {pathname = ''} = location;
    useEffect(() => {
        // Update the document title using the browser API
        
    });
    const checkTab = (item) => () => {
        history.push(item.path)
    }
    return (
        <div className="tabbar">
            {
                tabbarRouter.map(item => {
                    const isActive = item.path == pathname;
                    return (
                        <div className={`tab-item ${isActive ? 'active' : ''}`} key={item.path} onClick={checkTab(item)}>
                            <img className="tab-icon" src={isActive ? item.iconActive : item.icon} />
                            <div className={`tab-name ${isActive ? 'active' : ''}`}>{item.tabName}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Tabbar;