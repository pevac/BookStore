import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import ListGroup  from 'react-bootstrap/lib/ListGroup';
import ListGroupItem  from 'react-bootstrap/lib/ListGroupItem';
import Button  from 'react-bootstrap/lib/Button';
import { LinkContainer } from 'react-router-bootstrap';
import  Modal  from 'react-modal';
import * as actions from '../actions';
import CollectionForm from './CollectionForm';

const customModalStyles = {
    content: {
        width: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: '24%',
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 100,
    },
};

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
            return <ListGroupItem key={item._id} className='list-group-item-action clearfix'>
                    <span>{item.name}</span>
                    <Button bsStyle='primary'  className='btn-custom' onClick={() => {this.props.deleteCollection(item._id)}}>DELETE</Button>
                    <Button bsStyle='primary'  className='btn-custom' onClick={() => {this.props.openCollectionForm(item, true)}}>EDIT</Button>
                    <LinkContainer to={ '/collections/books/' } >
                        <Button bsStyle='primary' className='btn-custom' onClick={() => {this.props.selectCollection(item)}}>Detail</Button>
                    </LinkContainer>
                </ListGroupItem>
        })
        return <div>
            <Button bsStyle='primary' className="board-add-card" onClick={() => this.props.openCollectionForm({name: '', description: ''}, true)}>New</Button>
            <ListGroup>{list}</ListGroup>
            <Modal
                id="test"
                contentLabel="modalA"
                style={customModalStyles}
                isOpen={this.props.isOpenCollectionForm}
                closeTimeoutMS={150}>
                <CollectionForm 
                    selectedCollection = {this.props.selectedCollection}
                    saveCollection={this.props.saveCollection}
                    closeForm={this.props.closeCollectionForm}>
                </CollectionForm>
            </Modal>
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
