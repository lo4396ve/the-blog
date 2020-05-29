import {GLOBAL_ACTION} from '../actionType/global';
const globalAction = function(payload) {
    return {
        type: GLOBAL_ACTION,
        payload
    }
}
const globalActionAsync = function(payload) {
    return (dispatch, getState) => {}
}

export {
    globalAction
}