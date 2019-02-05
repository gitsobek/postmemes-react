import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PostField from './PostField';
import formFields from './formFields';

class PostForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    type="text"
                    name={name}
                    label={label}
                    component={PostField}
                />
            )
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onPostSubmit)}>
                    {this.renderFields()}
                    <Link to="/posts" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validateForm(values) {
    const errors = {};

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide ${name}.`
        }
    });

    return errors;
}

export default reduxForm({
    validate: validateForm,
    form: 'postForm',
    destroyOnUnmount: false
})(PostForm);