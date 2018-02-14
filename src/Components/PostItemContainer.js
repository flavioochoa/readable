import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Request from '../Helpers/Request';
//import { set_comments } from "../Actions/Posts";
import CommentItem from './CommentItem';
import PostItem from './PostItem';

class PostItemContainer extends Component {
    render(){
        let { post, comments, category } = this.props;
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{ category }</h2>
                </div>
                <PostItem post={post} showFullData/>
                
                <br/><br/><br/>
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Comments</h2>
                    </div>
                    {
                        comments.map((comment, index) => {
                            return <CommentItem comment={comment} key={index}/>
                        })
                    }
                </div>
            </div>
        );
    }    
}

const mapStateToProps = state => {
    return {
        post: state.posts.post,
        comments: state.posts.comments,
        category: state.categories.category
    }
}

export default connect(mapStateToProps, null)(PostItemContainer);