import React, { Component } from 'react';
import { connect } from 'react-redux';
import { set_current_category } from '../Actions/Categories';
import { set_current_post, set_post_model, update_post, delete_post, clear_comment_model } from '../Actions/Posts';
import { show } from '../Actions/Notification';
import CommentForm from './CommentForm';
import Request from '../Helpers/Request';
import Counters from './Counters';
import { Button, Icon, Card } from 'semantic-ui-react';
import ModalComponent from './ModalComponent';
import DeleteModalComponent from './DeleteModalComponent';
import { getDate } from '../Helpers/Format';

class PostItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            isDelete: false,
        }
    }

    render() {
        let { id, title, body, category, voteScore, commentCount, timestamp, author} = this.props.post;
        return (
            <div>
                {
                    this.props.showFullData ? 
                    <Card centered raised style={{minWidth:"800px"}}>
                        <Card.Content>
                            <Card.Header>
                                {author} on {getDate(timestamp)} <div  style={{ float:"right"}}> <Counters comments={commentCount} votes={voteScore}/></div>
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Card.Header>
                                {title}
                            </Card.Header>
                            <Card.Description>
                                {body}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui six buttons'>
                            <Button size="small" onClick={this.edit.bind(this)}><Icon name='edit'/> Edit</Button>
                            <Button size="small" onClick={this.delete.bind(this)}><Icon name='trash'/>Delete</Button>
                            <Button size="small" onClick={this.showCommentForm.bind(this)}><Icon name='add square' />Add Comment</Button>
                            
                            <Button size="small" icon='thumbs up' onClick={this.upVote.bind(this)}/>
                            <Button size="small" icon='thumbs down' onClick={this.downVote.bind(this)}/>  
                            </div>
                        </Card.Content>
                    </Card>
                    :
                    <Card centered raised style={{minWidth:"700px"}}>
                        <Card.Content>
                            <Card.Header>
                                <div style={{"maxWidth": "370px","display": "inline-block"}}>
                                    <div>
                                        <a href={`#${category}/${id}`}  onClick={ this.setCurrentItem.bind(this) }>
                                            { title }
                                        </a>
                                    </div>
                                    <div style={{color: "rgba(130, 130, 130, 0.85)"}}>By { author } on {getDate(timestamp)} </div>
                                </div>
                                
                                <div style={{"display": "inline-block","minWidth": "300px","maxWidth": "305px","verticalAlign": "top", float:"right"}}>
                                    <Counters comments={commentCount} votes={voteScore} size="small"/>&nbsp;&nbsp;&nbsp;
                                    <Button size="mini" icon='thumbs up' onClick={this.upVote.bind(this)}/>
                                    <Button size="mini" icon='thumbs down' onClick={this.downVote.bind(this)}/>   
                                </div>
                            </Card.Header>
                        </Card.Content>
                    </Card>
                }
                <ModalComponent  open={this.state.show} onClose={this.cancelComment.bind(this)} title="New Comment" icon="comments outline">
                    <CommentForm onAccept={this.addComment.bind(this)} onCancel={this.cancelComment.bind(this)}/>
                </ModalComponent>

                <DeleteModalComponent 
                    open={this.state.isDelete} 
                    title="Delete Post" 
                    icon="write"
                    content="Are you sure you want to delete this Post?"
                    onAccept={this.onAcceptDelete.bind(this)}
                    onCancel={this.onCancelDelete.bind(this)} 
                    onClose={this.onCancelDelete.bind(this)}
                />
            </div>
        );
    }

    setCurrentItem(e){
        this.props.set_current_category(this.props.post.category);
        this.props.set_current_post(this.props.post);
    }

    upVote() { //votas positivo
        this.vote('upVote');
    }

    downVote() { //votas negativo
        this.vote('downVote');
    }

    vote(option){
        let { post, update_post, set_current_post,showFullData } = this.props;
        Request(`/posts/${post.id}`, "POST", {}, {option})
        .then(response => {
            update_post(response.data);
            if(showFullData)
                set_current_post(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    edit() { //sale una modal para editar
        let {set_post_model, post } = this.props;
        set_post_model(post);
        window.location = `/#/formView/${post.id}`;
    }
    delete(){
        this.setState({isDelete:true});
    }
    onAcceptDelete() { //sale modal para pedir confirmacion
        let {delete_post, post, show} = this.props;
        
        Request(`/posts/${post.id}`, "DELETE")
        .then(response => {
            delete_post(response.data);
            window.location = "/#/";
            show("delete ok");
            this.setState({isDelete:false});
        })
        .catch(error => {
            console.log(error);
        });
    }
    onCancelDelete() {
        this.setState({isDelete:false});
    }

    showCommentForm(show) { //sale una modal para añadir un comentario y lo añade al array de comments
        this.setState({show:true});
        this.props.clear_comment_model();
        
    }
    
    addComment(){
        this.setState({show:false});
    }

    cancelComment() {
        this.setState({show:false});
        this.props.clear_comment_model();
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_current_category(category){
            dispatch(set_current_category(category));
        },
        set_current_post(post){
            dispatch(set_current_post(post));
        },
        set_post_model(postModel){
            dispatch(set_post_model(postModel));
        },
        update_post(post) {
            dispatch(update_post(post));
        }, 
        delete_post(post) {
            dispatch(delete_post(post));
        },
        clear_comment_model() {
            dispatch(clear_comment_model());
        },
        show(message){
            show(dispatch,message);
        },
    }
}

export default connect(null, mapDispatchToProps)(PostItem);