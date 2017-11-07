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

class BookForm extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        openForm: PropTypes.func,
        selectedBook: PropTypes.shape({
            description: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            _id: PropTypes.string
        })
    }
    
    static defaultProps = {
        isOpen: false,
        selectedBook: {
            name: "",
            description: ""
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.selectedBook
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ book: nextProps.selectedBook})
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        var newState = this.state.collection;
        newState[name] = value;
        this.setState({
            book: newState
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
                                    value={this.state.book.name}
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor='description' className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" name="description" id="description" placeholder="Description"
                                    value={this.state.book.description}
                                    onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <button type='button' onClick={() => false } className="btn btn-primary close-btn">Close</button>
                        <button type='button' onClick={() => false } className="btn btn-primary save-btn">Save</button>
                    </form>
            </Modal>
    }
}

export default BookForm;