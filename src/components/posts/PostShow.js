import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

class PostShow extends Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params._id);
    }

    render() {
        if(!this.props.post) {
            return '';
        }

        const { title, content } = this.props.post;

        return (
            <div>
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchPost })(PostShow);