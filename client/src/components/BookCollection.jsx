import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../actions';
import {intersection} from 'underscore';

class BookCollection extends Component {
    static propTypes = {
        books: PropTypes.array,
        collection: PropTypes.shape({
            books: PropTypes.array,
            description: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            _id: PropTypes.string
        })
    }
    
    static defaultProps = {
        books: [],
        collection: {
            name: "",
            description: "",
            books: []
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            addBookId: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllBooks();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ addBookId: ""})
    }

    componentWillUnmount(){
        localStorage.removeItem('collection')
    }

    handleChange(event) {
        this.setState({
            addBookId: event.target.value
        });
    }

    render() {
        const collectionBooks = this.props.books.filter((x) => {
            for(let i = 0; i< this.props.collection.books.length; i++){
                if(x._id === this.props.collection.books[i]) {
                    return true;
                }
            }
            return false
        });

        const bookForAddToCollection = this.props.books.filter((x) => {
            for(let i = 0; i< this.props.collection.books.length; i++){
                if(x._id === this.props.collection.books[i]) {
                    return false;
                }
            }
            return true
        });

        const books = collectionBooks.map((item, index) => {
            return <li key={item._id} className='list-group-item list-group-item-action'>
                    <p>Name: {item.name}</p>
                    <p>Author: {item.author}</p>
                    <p>Price: {item.price}</p>
                    <p>Rating: { item.rating }</p>
                    <a  className='btn btn-primary btn-custom' 
                        onClick={()=>{this.props.deleteBooksFromCollection(this.props.collection, item)}}>
                        DELETE
                    </a>
                </li>
        })
        let options = bookForAddToCollection.map((book, index) =>  {
             return  <option key={index} value={book._id}>{book.name}</option>
        });
        return <div>
            <h3>{this.props.collection.name}</h3>
            <p>{this.props.collection.description}</p>
            <select value={this.state.addBookId} onChange={this.handleChange}>
                <option >{'none'}</option>
                {options}
            </select>
            <a disabled={!(this.state.addBookId && this.state.addBookId !='none')}  
                className='btn btn-primary btn-custom' 
                onClick={()=>{this.props.addBookToCollection(this.props.collection._id, this.state.addBookId)}}>
                ADD BOOK
            </a>
            <h4>Books</h4>
            <ul className='list-group'>{books}</ul>
        </div>;
    }
}

const saveToStorage = (value) => {
    if(value._id) {
        localStorage.setItem('collection', JSON.stringify(value));
    }
    return JSON.parse(localStorage.getItem('collection'));
}

const mapStateToProps = (state, ownProps) => {
    return {
        collection: saveToStorage(state.collections.selectedCollection),
        books: state.books.books 
    };
} 

const mapDispatchToProps = dispatch => {
    const { getAllBooks, deleteBookFromCollection, addBookToCollection } = actions;
    return bindActionCreators({
        getAllBooks: getAllBooks.request,
        deleteBooksFromCollection: deleteBookFromCollection.request,
        addBookToCollection: addBookToCollection.request
    }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(BookCollection);
