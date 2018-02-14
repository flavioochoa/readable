import * as types from './Types.js'

export function showAlert(message, className){
    return {
        type:types.SHOW_ALERT,
        message,
        isVisible:true,
        className
    }
}
export function hideAlert(){
    return {
        type:types.HIDE_ALERT,
        isVisible:false,
    }
}


export function show(dispatch, message, className, ms=2000){
    dispatch(showAlert(message, className))

    setTimeout(() => {
        dispatch(hideAlert())
    }, ms)
}