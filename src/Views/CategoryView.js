import React, { Component } from 'react';
import { connect } from 'react-redux';
import { set_current_category } from '../Actions/Categories';
import { set_posts } from '../Actions/Posts';
import Request from '../Helpers/Request';
import PostItem from '../Components/PostItem';
import Breadcrumb from '../Components/Breadcrum';
import { Button } from 'semantic-ui-react';

class CategoryView extends Component {

    componentDidMount(){
        if(!this.props.category) { //from url, doesnt have posts
            this.props.set_current_category(this.props.match.params.category);
        }
        this.getPosts(this.props.match.params.category);
    }

    render() {
        let { category, posts } = this.props;
        return (
            <div>
                <Breadcrumb data={[{href:"/#/", label:"Main Page" }, {href:"", label:category}]}/>
                <div className="bookshelf">
                    <div className="bookshelf-title" style={{"paddingBottom": "33px"}}>
                        <div style={ {display: "inline",float: "right"} }>
                            <Button size="small" onClick={this.add.bind(this)}> Add New Post</Button>
                        </div>
                        
                    </div>
                </div>
                <div>
                {
                    posts.map((item, index)=>{
                        return <div key={index}><PostItem post={item} key={index} /><br/></div>
                    })
                }
                </div>
            </div>
        );
    }
    add() {
        this.props.history.push(`/formView`);
    }
    getPosts(category) {
        Request(`/${category}/posts`, "GET")
        .then((response) => {
            this.props.set_posts(response.data);
        })
        .catch((error)  => {
            console.log(error);
        });
    }
}

const mapStateToProps = state => {
    return {
        category : state.categories.category,
        posts : state.posts.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_current_category(category){
            dispatch(set_current_category(category));
        },
        set_posts(posts) {
            dispatch(set_posts(posts));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
