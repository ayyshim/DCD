import React, { Component } from "react";
import {Menu, Button, List, message, Tooltip, Col, Row, Dropdown, Icon, Comment, Input } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { Chat } from "../../Store/Actions/chatAction";
import {Link} from 'react-router-dom'
import { AddUserToChat } from "../../Store/Actions/chatAction";
import FileUploaderCustom from '../../Components/FileUploaderCustom/FileUploaderCustom'


class MainChatArea extends Component {

  state = {
    message: "",
    add_user_name: ""
  }

  onClick = () => {
    const details = {
      message: this.state.message,
      s_id: this.props.firebase.uid,
      s_dn : this.props.firebase.displayName,
      g_id: this.props.runningDiscussion
    };
    this.props.send_message(details);
    this.setState({
      message: ""
    });
  };

  onChangeMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  onChangeUserToAdd = e => {
    this.setState({
      add_user_name: e.target.value
    })
  }

  addUser = () => {
    // console.log("",this.props.fi.profile.username)
    // console.log("", this.props.group.adminName)
    if(this.props.group.adminName === this.props.fi.profile.username) {
      const username = this.state.add_user_name
      const g_id = this.props.runningDiscussion
      const s_id = this.props.firebase.uid
      this.props.addUserToGroup(username, g_id, s_id)
      
    } else {
      message.warn("Only admin can add new members.", 3)
    }

    this.setState({
      add_user_name: ""
    })
    
  }

 
  render() {

    const menu = this.props.members && (
      <Menu>
        {this.props.members.map((member)=> {return <Menu.Item key={member.id}>{member.name} {this.props.group.adminName === member.name ? <b>(admin)</b> : null}</Menu.Item>})}
      </Menu>
    )
    return (
      <Col span={18}>
        {this.props.group && (<Row id="message-box" className="up">
          <Col span={12}>
            <div id="grp-name">
              {this.props.group && this.props.group.name}{" "}
              {this.props.problem.problem_title === undefined
                ? ""
                : `> ${this.props.problem.problem_title}`}
                <Input type="text" onChange={this.onChangeUserToAdd} id="uname" value={this.state.add_user_name} placeholder="Username"/>
          <Button type="primary" onClick={this.addUser}>Add</Button><Dropdown overlay={menu}>
              <Link to="#" className="men">
                <Icon type="meh" />
              </Link>
            </Dropdown>
            </div>
            
          </Col>

          <Col span={12}> 
          <FileUploaderCustom/>
            </Col></Row>)}

        <Row id="chat-box" className="up">
          {this.props.group && (
            <List
              className="comment-list"
              itemLayout="horizontal"
              dataSource={this.props.list_message}
              renderItem={item => (
                <Comment
                  id="chat"
                  author={<b>{this.props.firebase.uid === item.s_id ? "YOU" : item.s_dn}</b>}
                  content={<p>{item.message}</p>}
                  datetime={
                    <Tooltip
                      title={moment()
                        .subtract(item.createAt, "days")
                        .format("YYYY-MM-DD HH:mm:ss")}
                    >
                      <span>
                        {moment()
                          .subtract(item.createAt)
                          .fromNow()}
                      </span>
                    </Tooltip>
                  }
                />
              )}
            />
          )}
        </Row>
        <br />
        <Row>
          <Col span={4} />
          <Col span={16}>
            <div>
              {this.props.group && (
                <Row>
                  <Col span={14}>
                    <Input
                      onChange={this.onChangeMessage}
                      placeholder="Type Message"
                      id="txt"
                      value={this.state.message}
                    />
                  </Col>
                  <Col span={8} offset={2}>
                    <Button onClick={this.onClick} type="primary" id="send-btn">
                      Send <Icon type="cloud-upload" />
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
          <Col span={4} />
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const key = ownProps.runningDiscussion;
  const groups = state.firestore.data.groups;
  const group = groups ? groups[key] : null;
  const members =
    state.firestore.ordered.members &&
    state.firestore.ordered.members.filter(m => {
      return m.g_id === key;
    });  
  const messages = state.firestore.ordered.messages;
  const list_message =
    messages &&
    messages.filter(msg => {
      return msg.g_id === key;
    });
    
  return {
    fi: state.firebase,
    firebase: state.firebase.auth,
    firestore: state.firestore,
    group,
    members,
    problem: state.problem.problem,
    list_message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    send_message: detail => dispatch(Chat(detail)),
    addUserToGroup: (username, g_id, s_id) => dispatch(AddUserToChat(username, g_id, s_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainChatArea);
