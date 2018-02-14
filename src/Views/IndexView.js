import React, { Component } from 'react';
import { connect } from 'react-redux';
import { set_categories } from '../Actions/Categories';
import { set_posts, sort_posts, set_current_post } from '../Actions/Posts';
import { set_current_category } from '../Actions/Categories';
import Request from '../Helpers/Request';
import { getCategories } from '../Helpers/CommonRequests';

import CategoryItem from '../Components/CategoryItem';
import PostItem from '../Components/PostItem';

import { Button } from 'semantic-ui-react';
import Breadcrumb from '../Components/Breadcrum';


class IndexView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVoteScoreSort: "ASC",
            currentStampdateSort: "ASC",
        }
    }
    componentDidMount() {
        this.props.set_current_category(null);
        this.props.set_current_post(null);
        getCategories(this.props.set_categories);
        this.getPosts();
    }

    render() {
        let { categories, posts, history } = this.props;
        return (
            <div>
                <Breadcrumb data={[{href:"/#/", label:"Main Page" }]}/>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Categories</h2>
                </div>
                {
                    categories.map((item, index)=>{
                        return <CategoryItem data={item} key={index} history={history} />
                    })
                }
                <br/>
                <br/>
                <div className="bookshelf">
                    <div className="bookshelf-title" style={{"paddingBottom": "3px"}}>
                        <h2 style={{display:"inline"}}>Posts</h2>
                        <div style={ {display: "inline",float: "right"} }>
                            <Button size="small" onClick={this.sort.bind(this, 'voteScore', this.state.currentVoteScoreSort)}> Sort by voteScore {this.state.currentVoteScoreSort==="ASC"?"DES":"ASC"}</Button>
                            <Button size="small" onClick={this.sort.bind(this, 'timestamp', this.state.currentStampdateSort)}> Sort by stampdate {this.state.currentStampdateSort==="ASC"?"DES":"ASC"}</Button>
                            <Button size="small" onClick={this.add.bind(this)}> Add New Post</Button>
                        </div>
                        
                    </div>
                </div>
                {
                    posts.map((item, index)=>{
                        return <div key={index}><PostItem post={item} key={index} /><br/></div>
                    })
                }
            </div>
        );
    }

    getPosts() {
        Request('/posts', "GET")
        .then((response) => {
            this.props.set_posts(response.data);
        })
        .catch((error)  => {
            console.log(error);
        });
    }

    sort(key, type, e) {
        this.props.sort_posts(key, type);
        if(key==="voteScore")
            this.setState({currentVoteScoreSort: this.state.currentVoteScoreSort === "ASC" ? "DES": "ASC"});
        else if (key==="timestamp")
            this.setState({currentStampdateSort: this.state.currentStampdateSort === "ASC" ? "DES": "ASC"});
    }
    
    add(e) {
        this.props.history.push("/formView");
    }
} 

const mapStateToProps = state => {
    return {
        categories: state.categories.data,
        posts : state.posts.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_categories(categories) {
            dispatch(set_categories(categories));
        },
        set_posts(posts) {
            dispatch(set_posts(posts));
        },
        sort_posts(key, type){
            dispatch(sort_posts(key, type));
        },
        set_current_category(category){
            dispatch(set_current_category(category));
        },
        set_current_post(post){
            dispatch(set_current_post(post));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)