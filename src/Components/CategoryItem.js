import React, { Component } from 'react';
import { connect } from 'react-redux';
import { set_current_category } from '../Actions/Categories';
import { Card } from 'semantic-ui-react';

class CategoryItem extends Component {
    
    render() {
        return (
            <Card centered raised style={{minWidth:"700px", textAlign:"center"}} onClick={ this.setCurrentCategory2.bind(this) }>
                <Card.Content >
                    <Card.Header style={{color: "#4183c4",textDecoration: "none"}}>
                        { this.props.data.name }
                    </Card.Header>
                </Card.Content>
            </Card>
        );
    }

    setCurrentCategory2(e) {
        this.props.set_current_category(this.props.data.path);
        window.location = `/#/${this.props.data.path} `;
    }

    setCurrentCategory(e){
        this.props.set_current_category(this.props.data.path);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_current_category(category){
            dispatch(set_current_category(category));
        }
    }
}

export default connect(null, mapDispatchToProps)(CategoryItem);