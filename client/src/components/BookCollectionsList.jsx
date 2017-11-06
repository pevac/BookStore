import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
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
            _id: PropTypes.string
        })
    }
    
    static defaultProps = {
        collections: [],
        isOpenCollectionForm: false,
        selectedCollection: {
            name: "",
            description: ""
        }
    }

    componentDidMount() {
        this.props.getAllCollections();
    }

    render() {
        const list = this.props.collections.map((item, index) => {
            return <li key={item._id} className='list-group-item list-group-item-action'>
                    <span>{item.name}</span>
                    <a  className='btn btn-primary' onClick={() => {this.props.deleteCollection(item._id)}}>DELETE</a>
                    <a  className='btn btn-primary' onClick={() => {this.props.openCollectionForm(item, true)}}>EDIT</a>
                    <Link className='btn btn-primary' to={ '/collection/view' } onClick={() => {this.props.selectCollection(item)}}>Detail</Link>
                </li>
        })
        return <div>
            <button type="button" className="btn  board-add-card" onClick={() => this.props.openCollectionForm({name: '', description: ''}, true)}>New</button>
            <ul className='list-group'>{list}</ul>
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
