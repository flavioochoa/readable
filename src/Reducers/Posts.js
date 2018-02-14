import * as types from '../Actions/Types';


const _getEmptyCommentModel = () => {
    return {
        id: "",
        timestamp: "",
        body: "",
        author: "",
        parentId: "",
    };
}

const _getEmptyPostModel = () => {
    return {
        id: "", 
        timestamp: "",
        title: "", 
        body: "", 
        author: "", 
        category: "", 
    };
}

const initialState = {
    data:[],
    post:null,
    comments:[],
    postModel: _getEmptyPostModel(),
    commentModel: _getEmptyCommentModel()
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_POSTS:
            return setPost(state, action);
        case types.SORT_POSTS:
            return sort(state, action);
        case types.SET_CURRENT_POST:
            return setCurrentPost(state, action);
        case types.SET_COMMENTS:
            return setComments(state, action)
        case types.UPDATE_POST_MODEL:
            return updatePostModel(state, action);
        case types.ADD_POST:
            return addPost(state, action);
        case types.ADD_COMMENT:
            return addComment(state, action);
        case types.UPDATE_COMMENT_MODEL:
            return updateCommentModel(state, action);
        case types.CLEAR_COMMENT_MODEL:
            return clearCommentModel(state, action);
        case types.SET_POST_MODEL:
            return setPostModel(state, action);
        case types.SET_COMMENT_MODEL:
            return setCommentModel(state, action);
        case types.UPDATE_COMMENT:
            return updateComment(state, action);
        case types.DELETE_COMMENT:
            return deleteComment(state, action);
        case types.UPDATE_POST:
            return updatePost(state, action)
        case types.DELETE_POST:
            return deletePost(state, action);
        default:
            return state;
    }
}

const setPost = (state, action) => {
    let { posts } = action;
    return {
        ...state,
        data:posts,
        postModel: _getEmptyPostModel(),
    };
}

const sort = (state, action) => {
    let {sortType, key} = action;
    let fun;
    let arr = state.data.slice()
    if(sortType === "ASC") {
        fun = (a,b)=>a[key]-b[key];
    }else if(sortType === "DES") {
        fun = (a,b)=>b[key]-a[key];
    }
   
    arr.sort(fun);  // [ 1, 5, 40, 200 ]
    return {
        ...state,
        data:arr,
    }
}

const setCurrentPost = (state, action) => {
    let { post } = action;
    return {
        ...state,
        post
    };
}

const setComments = (state, action) => {
    let { comments } = action;
    return {
        ...state,
        comments
    };
}

const updatePostModel = (state, action) => {
    let {key, value} = action;
    return {
        ...state,
        postModel:{
            ...state.postModel,
            [key]: value,
        }
    }; 
}

const addPost = (state, action) => {
    return {
        ...state,
        data: [...state.data, action.post],
        postModel: _getEmptyPostModel()
    };
}

const clearCommentModel = (state, action) => {
    return {
        ...state,
        commentModel: _getEmptyCommentModel()
    }
}

const addComment = (state, action) => {
    let post = {};
    Object.assign(post, state.post);
    post.commentCount +=1;
    return {
        ...state,
        comments: [...state.comments, action.comment],
        commentModel: _getEmptyCommentModel(),
        post,
    };
}

const updateCommentModel = (state, action) => {
    let {key, value} = action;
    return {
        ...state,
        commentModel:{
            ...state.commentModel,
            [key]: value,
        }
    }
}

const setPostModel = (state, action) => {
    let { postModel } = action;
    return {
        ...state,
        postModel
    }
}
const setCommentModel = (state, action) => {
    let { commentModel } = action;
    return {
        ...state,
        commentModel
    }
}

const updateComment = (state, action) => {
    let { comment } = action;
    let comments = state.comments.map( (item) => {
        if(item.id !== comment.id) {
            return item;
        }

        return {
            ...item,
            ...comment
        };    
    });

    return {
        ...state,
        comments
    }
}


const deleteComment = (state, action) => {
    let comments = state.comments.filter( (item) => item.id !== action.comment.id);
    let post = {};
    Object.assign(post, state.post);
    post.commentCount -=1;
    return {
        ...state,
        comments,
        post
    }
}

const updatePost = (state, action) => {
    let { post } = action;
    let data = state.data.map( (item) => {
        if(item.id !== post.id) {
            return item;
        }

        return {
            ...item,
            ...post
        };    
    });

    return {
        ...state,
        data
    }
}

const deletePost = (state, action) => {
    let data = state.data.filter( (item) => item.id !== action.post.id);
    return {
        ...state,
        data
    }
}


export default reducer;