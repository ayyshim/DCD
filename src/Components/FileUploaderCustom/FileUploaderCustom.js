import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import {Button} from "antd";
 
class FileUploaderCustom extends Component {
  state = {
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
 
  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("all")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ uploadURL: url }));
  };
 
  render() {
    return (
      <div>
          <FileUploader
            accept="*"
            name="Upload" id="src"
            randomizeFilename
            storageRef={firebase.storage().ref("all")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          <Button type="primary">Share Code</Button>
      </div>
    );
  }
}
 
export default FileUploaderCustom;