import  React, { Component } from 'react';
import  Modal  from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
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

class CollectionForm extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        openForm: PropTypes.func,
        selectedCollection: PropTypes.shape({
            description: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            _id: PropTypes.string
        })
    }
    
    static defaultProps = {
        isOpen: false,
        selectedCollection: {
            name: "",
            description: ""
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            collection: this.props.selectedCollection
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ collection: nextProps.selectedCollection})
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        var newState = this.state.collection;
        newState[name] = value;
        this.setState({
            collection: newState
        });
    }

    render() {
        return <Modal
                id="test"
                contentLabel="modalA"
                style={customStyles}
                isOpen = { this.props.isOpen }
                closeTimeoutMS={150}>
                    <form>
                        <div className="form-group row">
                            <label htmlFor='name' className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Title"
                                    value={this.state.collection.name}
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor='description' className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" name="description" id="description" placeholder="Description"
                                    value={this.state.collection.description}
                                    onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <button type='button' onClick={() => {this.props.closeForm()}} className="btn btn-primary close-btn">Close</button>
                        <button type='button' onClick={() => {this.props.saveCollection(this.state.collection)}} className="btn btn-primary save-btn">Save</button>
                    </form>
            </Modal>
    }
}

export default CollectionForm;