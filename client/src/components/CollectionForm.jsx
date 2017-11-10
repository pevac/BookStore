import  React, { Component } from 'react';
import { connect } from 'react-redux';
import  Modal  from 'react-modal';
import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/lib/Button';
import Form  from 'react-bootstrap/lib/Form';
import FormGroup  from 'react-bootstrap/lib/FormGroup';
import Col  from 'react-bootstrap/lib/Col';
import ControlLabel  from 'react-bootstrap/lib/ControlLabel';
import FormControl  from 'react-bootstrap/lib/FormControl';
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    } else if (values.name.length > 40) {
      errors.name = 'Must be 40 characters or less'
    }

    if (values.description && values.description.length > 300) {
        errors.description = 'Must be 300 characters or less'
    }
    
    return errors
}

class CollectionForm extends Component {
    static propTypes = {
        openForm: PropTypes.func,
        selectedCollection: PropTypes.shape({
            description: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            _id: PropTypes.string
        })
    }
    
    static defaultProps = {
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

    InputField = (props) => {
        return (
            <FormGroup className={props.meta.touched && props.meta.error ? 'has-error row' : 'row'}>
                    <Col htmlFor={props.uniqName} componentClass={ControlLabel} sm={2}>{props.label}</Col>
                    <Col sm={10}>
                        <FormControl {...props.input} id={props.uniqName} placeholder={props.label}
                            componentClass= {props.componentClass}
                            value={props.values}
                            type={props.type} name={props.uniqName}>
                        </FormControl>
                        {props.meta.touched && ((props.meta.error && <span className='error-container'>{props.meta.error}</span>) || 
                        (props.meta.warning && <span className='warning-container'>{props.meta.warning}</span>))}
                    </Col>
            </FormGroup>)
    }

    render() {
        
        return <Form>
                    <Field uniqName='name' label='Title' 
                            type="text" name="name"
                            values={this.state.collection.name}
                            onChange={this.handleInputChange}
                            component = {this.InputField}>
                    </Field>
                    <Field uniqName='description' label='Description' 
                            type="text" name="description"
                            componentClass= 'textarea'
                            values={this.state.collection.description}
                            onChange={this.handleInputChange}
                            component = {this.InputField}>
                    </Field>
                    <FormGroup className='row'>
                        <Button  onClick={() => {this.props.closeForm()}} className="btn btn-primary close-btn">Close</Button>
                        <Button  onClick={() => {this.props.saveCollection(this.state.collection)}} className="btn btn-primary save-btn">Save</Button>
                    </FormGroup>
                </Form>
    }
}

export default reduxForm({ form: 'collection', validate })(CollectionForm)
