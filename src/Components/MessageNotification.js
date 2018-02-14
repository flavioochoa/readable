import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const notify = (props) => toast(props.content);

class MessageNotification extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.isVisible && nextProps.content !== this.props.content)
            notify(nextProps);
    }

    render(){
        return(<ToastContainer 
            position="bottom-right"
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            toastClassName= {this.props.className ? this.props.className :"dark-toast"} 
            progressClassName="transparent-progress" 
        />)
    }
    
}

export default MessageNotification;