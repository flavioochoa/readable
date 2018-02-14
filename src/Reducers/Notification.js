import * as types from '../Actions/Types';

const initialState = {
    alert: {
        message: "",
        isVisible: false,
    }
}


const reducer = (state = initialState, action)=>{
    switch(action.type){
        case types.SHOW_ALERT:
        const { message,isVisible, className } = action
            return {
                ...state,
                alert:{
                    message,
                    isVisible,
                    className
                }
            }
        
        case types.HIDE_ALERT:
            return {
                ...state,
                alert: {
                    message:"",
                    isVisible:false,
                    className:""
                }
            }
        
        default:
            return state
    }
}

export default reducer