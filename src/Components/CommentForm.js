import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update_comment_model, add_comment, clear_comment_model, update_comment } from '../Actions/Posts';
import Request from '../Helpers/Request';
import uuidv1 from 'uuid/v1';
import { Form, Button } from 'semantic-ui-react';
import { show } from '../Actions/Notification';

class CommentForm extends Component {
    render(){
        let { comment, update_comment_model, isUpdate } = this.props;
        let { body, author } = comment;
        return (
            <div style={{paddingBottom: "30px",}}>
                <Form>
                    <Form.Group unstackable>
                        <Form.Input label='Author *' placeholder='Author' width={6}
                            disabled={isUpdate}
                            value={ author }
                            onChange= { e => update('author', e.target.value, update_comment_model) }
                        />
                        <Form.Input label='Comment *' placeholder='Comment' width={10}
                            value={ body }
                            onChange= { e => update('body', e.target.value, update_comment_model ) }
                        />
                    </Form.Group>
                    <Button size="small" floated='right' className="ui right button" type='button' onClick={ this.accept.bind(this) }>Save</Button>
                    <Button size="small" floated='right' className="ui right button" type='button' onClick={ this.cancel.bind(this) }>Cancel</Button>      
                </Form>
            </div>
        );    
    }

    accept() {
        let { comment, add_comment, clear_comment_model, parentId, onAccept, isUpdate, update_comment, show } = this.props;
        if(!comment.author || !comment.body) {
            show("All fields are required", "warning-toast");
            return;
        }
        let data = {};
        Object.assign(data, comment);
        data.timestamp = Date.now();
        if(!isUpdate){
            data.parentId = parentId;
            data.id = uuidv1();
            Request(`/comments`, "POST", {}, data)
            .then((response) => {
                add_comment(response.data);
                onAccept();
                clear_comment_model();
                show("Add ok");
            })
            .catch((error)  => {
                console.log(error);
            });
        } else {
            Request(`/comments/${data.id}`, "PUT", {}, data)
            .then((response) => {
                update_comment(response.data);
                onAccept();
                clear_comment_model();
                show("update ok");
            })
            .catch((error)  => {
                console.log(error);
            });
        }     
    }

    cancel(){
        let { onCancel, clear_comment_model } = this.props;
        onCancel()
        clear_comment_model();
    }
}

const update = (key, value, fn) => {
    fn(key, value);
}

const mapStateToProps = state => { 
    return {
        comment: state.posts.commentModel,
        parentId: state.posts.post.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_comment_model(key, value) {
            dispatch(update_comment_model(key, value));
        },
        add_comment(comment) {
            dispatch(add_comment(comment));
        },
        clear_comment_model() {
            dispatch(clear_comment_model());
        },
        update_comment(comment) {
            dispatch(update_comment(comment));
        },
        show(message, className){
            show(dispatch,message, className);
        },  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);