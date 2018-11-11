import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class PostNew extends Component {

}

export default reduxForm({
    form: 'postForm'
})(PostNew);