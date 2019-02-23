import React, { Component } from "react";
import firebase from '../../Configs/firebaseConfig'
import FileUploader from "react-firebase-file-uploader";
import {message} from 'antd'
import { MakeEntry } from "../../Store/Actions/projectActions";
import {connect} from 'react-redux'
class FileUploaderCustom extends Component {
  state = {
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
 

  handleUploadStart = () => {
    message.loading('Uploading...')
  };
  handleProgress = progress => {
    console.log(progress)
  };
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    message.success("Problem file uploaded")
    const forFirestore = {
      filename,
      g_id: this.props.problem_id,
      by: this.props.user,
      created_at: new Date()
    }
    this.props.upadateToFirestore(forFirestore)
  };
 
  render() {
    return (
      <div>
          <FileUploader
            accept="*"
            name="Upload" id="src"
            randomizeFilename
            storageRef={firebase.storage().ref(`problems/${this.props.problem_id}`)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upadateToFirestore: (forFirestore) => dispatch(MakeEntry(forFirestore))
  }
}

export default connect(null, mapDispatchToProps)(FileUploaderCustom);