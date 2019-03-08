import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

class PostFormReview extends Component {
  state = { file: null };

  fetchFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <div>
        <button className="yellow darken-3 btn-flat" onClick={onCancel}>
          Back
        </button>
        <button className="green btn-flat right white-text">
          Send Meme
          <i className="material-icons right">note_add</i>
        </button>
      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();

    const { submitPost, history, formValues } = this.props;

    submitPost(formValues, this.state.file, history);
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h5>Confirm your post. Attach an image.</h5>
        {this.fetchFields()}

        <h5>Add Image</h5>
        <input
          style={{ marginBottom: "10px" }}
          onChange={this.onFileChange.bind(this)}
          type="file"
          accept="image/*"
        />

        {this.renderButtons()}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.postForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(PostFormReview));
