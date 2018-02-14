import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import { set_comment_model, clear_comment_model, update_comment, delete_comment } from '../Actions/Posts';
import Request from '../Helpers/Request';
import { Button, Icon, Label, Card } from 'semantic-ui-react';
import ModalComponent from './ModalComponent';
import DeleteModalComponent from './DeleteModalComponent';
import { getDate } from '../Helpers/Format';

class CommentItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
            isDelete: false,
        }
    }

    render() {
        let {  timestamp, body, author, voteScore } = this.props.comment;
        return (
            <div style={{paddingBottom:"20px"}}>
                <Card centered raised style={{minWidth:"450px"}}>
                    <Card.Content>
                        <Card.Header>
                            {author} on {getDate(timestamp)} 
                            <Label style={{float:"right"}}>
                                <Icon name='heart' />
                                {voteScore}
                                <Label.Detail>Votes</Label.Detail>
                            </Label>
                        </Card.Header>
                        <Card.Description>
                            {body}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui four buttons'>
                            <Button size="small" onClick={this.edit.bind(this)}><Icon name='edit'/> </Button>
                            <Button size="small" onClick={this.showDelete.bind(this)}><Icon name='trash'/></Button>
                            <Button size="small" icon='thumbs up' onClick={this.upVote.bind(this)}/>
                            <Button size="small" icon='thumbs down' onClick={this.downVote.bind(this)}/> 
                        </div>
                    </Card.Content>
                </Card>
                
                <ModalComponent  open={this.state.isEdit} onClose={this.onCancel.bind(this)} title={!this.state.isEdit ? "New Comment": "Edit Comment" } icon="comments outline">
                    <CommentForm onAccept={this.updateComment.bind(this)} onCancel={this.onCancel.bind(this)} isUpdate/>
                </ModalComponent>

                <DeleteModalComponent 
                    open={this.state.isDelete} 
                    title="Delete Comment" 
                    icon="comments outline"
                    content="Are you sure you want to delete this comment?"
                    onAccept={this.onAcceptDelete.bind(this)}
                    onCancel={this.onCancelDelete.bind(this)} 
                    onClose={this.onCancelDelete.bind(this)}
                />
            </div>
        );
    }

    edit() { //sale modal para editar el comentario
        this.setState({ isEdit:true });
        this.props.set_comment_model(this.props.comment);
    }

    updateComment() {
        this.setState({ isEdit:false });
        this.setState({content:"olakease", isVisible:true});
    }

    onCancel() {
        this.setState({ isEdit:false });
        this.props.clear_comment_model();
    }

    upVote() { //voto positivo
        this.vote('upVote');
    }

    downVote() { //voto negativo
        this.vote('downVote');
    }

    vote(option){
        let { comment, update_comment } = this.props;
        Request(`/comments/${comment.id}`, "POST", {}, {option})
        .then(response => {
            update_comment(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    showDelete() {
        this.setState({isDelete:true});
    }
    onAcceptDelete(){
        this.setState({isDelete:false});
        this.delete();
    }

    onCancelDelete(){
        this.setState({isDelete:false});
    }

    delete() { //pide confirmacion para eliminar
        Request(`/comments/${this.props.comment.id}`, "DELETE")
        .then(response => {
            this.props.delete_comment(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
}


const mapDispatchToProps = dispatch => {
    return {
        set_comment_model(commentModel) {
            dispatch(set_comment_model(commentModel));
        },
        clear_comment_model() {
            dispatch(clear_comment_model());
        },
        update_comment(comment) {
            dispatch(update_comment(comment));
        },
        delete_comment(comment) {
            dispatch(delete_comment(comment));
        },
    }
}

export default connect(null, mapDispatchToProps)(CommentItem);