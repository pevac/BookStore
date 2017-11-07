import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import ListGroup  from 'react-bootstrap/lib/ListGroup';
import ListGroupItem  from 'react-bootstrap/lib/ListGroupItem';
import * as actions from '../actions';
import CollectionForm from './CollectionForm';

class BookCollectionsList extends Component {
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
        this.props.getAllCollections();
    }

    render() {
        const list = this.props.collections.map((item, index) => {
            return <ListGroupItem key={item._id} className='list-group-item-action'>
                    <span>{item.name}</span>
                    <a  className='btn btn-primary btn-custom' onClick={() => {this.props.deleteCollection(item._id)}}>DELETE</a>
                    <a  className='btn btn-primary btn-custom' onClick={() => {this.props.openCollectionForm(item, true)}}>EDIT</a>
                    <Link collection = {item} className='btn btn-primary btn-custom' to={ '/collections/books/' } onClick={() => {this.props.selectCollection(item)}}>Detail</Link>
                </ListGroupItem>
        })
        return <div>
            <button type="button" className="btn  board-add-card" onClick={() => this.props.openCollectionForm({name: '', description: ''}, true)}>New</button>
            <ListGroup>{list}</ListGroup>
            <CollectionForm 
                selectedCollection = {this.props.selectedCollection}
                isOpen={this.props.isOpenCollectionForm}
                saveCollection={this.props.saveCollection}
                closeForm={this.props.closeCollectionForm}>
            </CollectionForm>
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        collections: state.collections.collections,
        selectedCollection: state.collections.selectedCollection, 
        isOpenCollectionForm: state.collections.isOpenCollectionForm    
    };
} 

const mapDispatchToProps = dispatch => {
    const { getAllCollections, deleteCollection, saveCollection, openCollectionForm,selectCollection, closeCollectionForm} = actions;
    return bindActionCreators({
        getAllCollections: getAllCollections.request,
        deleteCollection: deleteCollection.request,
        saveCollection: saveCollection.request,
        openCollectionForm, closeCollectionForm, selectCollection
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(BookCollectionsList);
