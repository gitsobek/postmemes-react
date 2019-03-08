import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../../actions";

class PostShow extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params._id);
  }

  renderImage() {
    if (this.props.post.imageUrl) {
      return (
        <img
          style={{ width: "60%", height: "80%" }}
          src={
            "https://s3.eu-central-1.amazonaws.com/postmemes/" +
            this.props.post.imageUrl
          }
          alt={this.props.post.title + " image"}
        />
      );
    }
  }

  render() {
    if (!this.props.post) {
      return "";
    }

    const { title, content } = this.props.post;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params._id] };
}

export default connect(
  mapStateToProps,
  { fetchPost }
)(PostShow);
