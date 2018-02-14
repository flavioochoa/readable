import * as types from './Types';

export function set_posts(posts) {
    return {
        type: types.SET_POSTS, 
        posts
    }
}

export function sort_posts(key, sortType){
    return {
        type: types.SORT_POSTS,
        key,
        sortType
    }
}

export function set_current_post(post) {
    return {
        type: types.SET_CURRENT_POST,
        post
    }
}

export function set_comments(comments) {
    return {
        type: types.SET_COMMENTS,
        comments,
    }
}

export function update_post_model(key, value) {
    return {
        type: types.UPDATE_POST_MODEL,
        key,
        value
    }
}

export function add_post(post) { 
    return {
        type: types.ADD_POST,
        post
    }
}

export function add_comment(comment) {
    return {
        type: types.ADD_COMMENT,
        comment,
    }
}

export function update_comment_model(key, value) {
    return {
        type: types.UPDATE_COMMENT_MODEL,
        key, 
        value
    }
}

export function clear_comment_model(){
    return {
        type: types.CLEAR_COMMENT_MODEL,
    }
}

export function set_post_model(postModel) {
    return {
        type: types.SET_POST_MODEL,
        postModel
    }
}

export function set_comment_model(commentModel) {
    return {
        type: types.SET_COMMENT_MODEL,
        commentModel
    }
}

export function update_comment(comment){
    return {
        type: types.UPDATE_COMMENT,
        comment,
    }
}

export function delete_comment(comment) {
    return {
        type: types.DELETE_COMMENT,
        comment
    }
}

export function update_post(post) {
    return {
        type: types.UPDATE_POST,
        post
    }
}

export function delete_post(post) {
    return {
        type: types.DELETE_POST,
        post
    }
}
