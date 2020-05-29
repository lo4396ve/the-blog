import {GLOBAL_ACTION} from '../actionType/global';
const initData = {
    testData: 'test'
};
function selectedSubreddit(state = initData, action) {
    switch (action.type) {
        case GLOBAL_ACTION:
            return Object.assign(state, {testData: action.payload})
        default:
            return state
    }
}
export default selectedSubreddit;