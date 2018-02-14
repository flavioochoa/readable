import React, { Component } from 'react';
//import { Form, Text, Radio, RadioGroup, Select, Checkbox,TextArea } from 'react-form';
import { connect } from 'react-redux';
import { getCategories } from '../Helpers/CommonRequests';
import { set_categories } from '../Actions/Categories';
import { update_post_model, add_post, set_post_model, update_post } from '../Actions/Posts';
import { show } from '../Actions/Notification';
import uuidv1 from 'uuid/v1';
import Request from '../Helpers/Request';
import { Form, Button } from 'semantic-ui-react';
import Breadcrumb from "../Components/Breadcrum";

class FormView extends Component {

    componentDidMount() {
        let { categories, set_categories, match, postModel, set_post_model } = this.props;   
        if(!categories.length){
            getCategories(set_categories);
        }

        if(match.params.post_id && !postModel.id) {
            Request(`/posts/${match.params.post_id}`, "GET")
            .then((response) => {
                set_post_model(response.data);
            })
            .catch((error)  => {
                console.log(error);
            });
        }
    }

    render() {
        let { postModel, categories, update_post_model, match } = this.props;
        let { title, body, author, category} = postModel;
        let options = this.createOptions(categories);
        let isUpdate = match.params.post_id ? true : false;
        return (
            <div>
                <Breadcrumb data={[{href:"/#/", label:"Main Page" }, {href:"", label:!isUpdate ? "New Post" : "Edit Post"}]}/>
                <div className="ui one column stackable center aligned page grid">
                    <div className="column twelve wide">
                        <Form>
                            <Form.Group unstackable widths={3}>
                                <Form.Input label='Title *' placeholder='Title' 
                                    value={ title }
                                    onChange= { e => update('title', e.target.value, update_post_model ) }
                                />
                                <Form.Input label='Author *' placeholder='Author' 
                                    value={ author }
                                    disabled = {isUpdate}
                                    onChange= { e => update('author', e.target.value, update_post_model) }
                                />
                                <Form.Field label='Category *' control='select'
                                    value={ category } 
                                    onChange={ e => update('category', e.target.value, update_post_model) }
                                    disabled = {isUpdate}>
                                    <option value=""> Select category</option>
                                    {
                                        options.map((element, index) => {
                                            return (<option key={index} value={element.value}> {element.label}</option>);  
                                        })
                                    }
                                </Form.Field>
                            </Form.Group>
                            <Form.Field label='Post body *' control='textarea' rows='2' 
                                value={ body }
                                onChange= { e => update('body', e.target.value, update_post_model ) }
                            />
                                            
                            <Button size="small" type='button' floated='right' onClick={this.handleSubmit.bind(this)}>Save</Button>
                            <Button size="small" type='button' floated='right' onClick={this.cancel.bind(this)}>Cancel</Button>  
                        </Form>
                    </div>
                </div>
            </div>                   
        );
    }

    handleSubmit() {
        let { show, add_post, history, postModel } = this.props;
        if(!postModel.author || !postModel.title || !postModel.category || !postModel.body) {
            show("All fields are required", "warning-toast");
            return;
        }
        let data = {};
        Object.assign(data, postModel);
        if(!this.props.match.params.post_id) {
            data.id = uuidv1();
            data.timestamp = Date.now();
            Request(`/posts`, "POST", {}, data)
            .then((response) => {
                show("Add ok");
                add_post(response.data);
                history.push(`/${response.data.category}/${response.data.id}`);
            })
            .catch((error)  => {
                console.log(error);
            });
        } else {
            Request(`/posts/${data.id}`, "PUT", {}, data)
            .then((response) => {
                show("Update ok");
                history.push(`/${this.props.postModel.category}/${this.props.postModel.id}`);
                
            })
            .catch((error)  => {
                console.log(error);
            });
        }
    }

    cancel() {
        this.props.history.goBack();
    }

    createOptions(categories) {
        return categories.map(item => {
            return { label:item.name, value:item.name };
        });
    }
}

const update = (key, value, fn ) => {
    fn(key, value);
}

const mapStateToProps = state => {
    return {
        categories: state.categories.data,
        postModel: state.posts.postModel,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_categories(categories) {
            dispatch(set_categories(categories));
        },
        update_post_model(key, value){
            dispatch(update_post_model(key, value));
        },
        add_post(post){
            dispatch(add_post(post));
        },
        set_post_model(postModel) {
            dispatch(set_post_model(postModel))
        },
        update_post(post){
            dispatch(update_post(post));
        },
        show(message, className){
            show(dispatch,message, className);
        },  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormView);