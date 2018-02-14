import * as types from '../Actions/Types';

const initialState = {
    data:[],
    category: null,
    notification: {
        message: "",
        isVisible: false,
    }
}


const reducer = (state = initialState, action)=> {
    switch(action.type){
        case types.SET_CATEGORIES:
            let {categories} = action;
            return {
                ...state,
                data:categories,
            }
        case types.SET_CURRENT_CATEGORY:
            let  { category } = action;
            return {
                ...state,
                category
            }
        default:
            return state;
    }
}

export default reducer;