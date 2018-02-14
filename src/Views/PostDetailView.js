import React, { Component } from 'react';
import { connect } from 'react-redux';
import Request from '../Helpers/Request';
import { set_current_category } from '../Actions/Categories';
import { set_current_post, set_comments } from '../Actions/Posts';

import PostItemContainer from '../Components/PostItemContainer';
import Breadcrumb from '../Components/Breadcrum';

class PostDetailView extends Component {
    
    componentDidMount(){
        let { post, match, set_current_category, set_current_post } = this.props;
        
        if(!post) { //first load, doesnt have data
            set_current_category(match.params.category);

            Request(`/posts/${match.params.post_id}`, "GET")
            .then((response) => {
                set_current_post(response.data);
                this.getComments();
            })
            .catch((error)  => {
                console.log(error);
            });
        }else{
            this.getComments();
        }
        
    }


    render() {
        let p = this.props.post && Object.keys(this.props.post).length;
        return (
            <div>
                 <Breadcrumb data={[{href:"/#/", label:"Main Page" }, {href:`/#/${this.props.category}`, label:this.props.category}, {href:"", label: p ? this.props.post.title : ""}]}/>
                {
                    p ? <PostItemContainer/> :
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">No post has been selected or does not exist <a href="/#/"> Click here to return Main Page</a></h2>
                    </div>
                }
            </div>
        );
    }

    getComments() {
        Request(`/posts/${this.props.post.id}/comments`, "GET")
        .then((response) => {
            this.props.set_comments(response.data);
        })
        .catch((error)  => {
            console.log(error);
        });
    }
} 


const mapStateToProps = state => {
    return {
        category : state.categories.category,
        post: state.posts.post
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
        set_comments(comments){
            dispatch(set_comments(comments));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);
