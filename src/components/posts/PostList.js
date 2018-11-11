import React, { Component } from 'react';
import { map } from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../actions';

class PostList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return map(this.props.posts, post => {
            return (
                <div className="card darken-1 horizontal" key={post.id}>
                    <div className="card-stacked">
                        <div className="card-content">
                            <span className="card-title">{post.title}</span>
                            <p>{post.content}</p>
                        </div>
                        <div className="card-action">
                            <Link to={`/posts/${post._id}`}>Read</Link>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div>{this.renderPosts()}</div>;
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostList);