import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListGroup  from 'react-bootstrap/lib/ListGroup';
import ListGroupItem  from 'react-bootstrap/lib/ListGroupItem';
import Button  from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class BookList extends Component {
    static propTypes = {
        collections: PropTypes.array,
        isOpenCollectionForm: PropTypes.bool,
        getAllCollections: PropTypes.func,
        deleteCollection: PropTypes.func,
        selectedCollection: PropTypes.shape({
            description: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            books: PropTypes.array,
            _id: PropTypes.string
        })
    }
    
    static defaultProps = {
        collections: [],
        isOpenCollectionForm: false,
        selectedCollection: {
            name: "",
            description: "",
            books: []
        }
    }

    componentDidMount() {
        this.props.getAllBooks();
    }

    render() {
        const list = this.props.books.map((item, index) => {
            return <ListGroupItem key={item._id} className='list-group-item-action clearfix'>
                    <p>Name: {item.name}</p>
                    <p>Author: {item.author}</p>
                    <p>Price: {item.price}</p>
                    <p>Rating: { item.rating }</p>
                    <Button  className='btn btn-primary btn-custom' onClick={() => false }>DELETE</Button>
                    <Button  className='btn btn-primary btn-custom' onClick={() =>  false }>EDIT</Button>
                </ListGroupItem>
        })
        return <div>
            <Button className="btn  board-add-card" onClick={() => false }>New</Button>
            <ListGroup>{list}</ListGroup>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        books: state.books.books,
        selectedBook: state.books.selectedBook, 
        isOpenBooksForm: state.books.isOpenBooksForm    
    };
} 

const mapDispatchToProps = dispatch => {
    const { getAllBooks } = actions;
    return bindActionCreators({
        getAllBooks: getAllBooks.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(BookList);