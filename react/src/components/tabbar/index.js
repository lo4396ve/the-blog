import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

function Tabbar(props) {
    console.log('tabbar', props)
    return (
        <div className="tabbar">
            bar1
            bar2
            bar3
        </div>
    )
}
export default withRouter(Tabbar);