import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions';

class BookCollection extends Component {
    componentDidMount() {
        this.props.getAllBooks();
    }
    render() {
        return <div>
            <h3>{this.props.collection.name}</h3>
            <p>{this.props.collection.description}</p>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    
    return {
        collection: state.collections.selectedCollection,
        books: state.books.books 
    };
} 

const mapDispatchToProps = dispatch => {
    const { getAllBooks } = actions;
    return bindActionCreators({
        getAllBooks: getAllBooks.request
    }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(BookCollection);
