import React, { Component } from 'react';
import './App.css';

import { Route, HashRouter, Switch } from 'react-router-dom'

import IndexView from './Views/IndexView';
import FormView from './Views/FormView';
import CategoryView from './Views/CategoryView';
import PostDetailView from './Views/PostDetailView';
import { connect } from 'react-redux';
import MessageNotification from '../src/Components/MessageNotification'

class App extends Component {
    render() {
        return (
            <div>
                <div className="list-books-title">
                    <a href="/#/">
                        <h1 style={{display:"inline"}}>Readable</h1>
                    </a>
                </div>
                <div className="list-books-content">
                    <HashRouter>             
                        <Switch>
                            <Route exact path="/" component={IndexView}/>
                            <Route exact path="/formView" component={FormView}/>
                            <Route exact path="/formView/:post_id" component={FormView}/>
                            <Route exact path="/:category" component={CategoryView}/>
                            <Route exact path="/:category/:post_id" component={PostDetailView}/>
                        </Switch>
                    </HashRouter>
                </div>
                <MessageNotification content={this.props.notification.message} isVisible={this.props.notification.isVisible} className={this.props.notification.className}/>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        category : state.categories.category,
        notification: state.notification.alert,
    }
}

export default connect(mapStateToProps, null)(App);