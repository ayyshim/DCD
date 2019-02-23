import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'

import { Logout } from '../../Store/Actions/authActions';
import { CreateGroup } from '../../Store/Actions/dashboardAction';
import {Row, Col, Avatar} from 'antd';
import {Button, Divider, Modal, Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Dropdown, message,
 Layout, Menu, Icon, Comment, Tooltip, List, Popover} from 'antd';
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
import GroupList from '../Groups/GroupList'
import MainChatArea from '../ChatArea/MainArea';
import ProblemsList from '../Problems/ProblemsList';


const code = `function add(a, b) {
  return a + b;
}
`;

const data = [
  {
    author: 'kanxuravi',
    content: (
      <p>I'm having a problem in this piece of code about fetching the data from a server. What is your approach? Please modify in it.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    author: 'aayshim',
    content: (
      <p>For Data Fetching, I mostly use Javascript as i'm more comfortable in it. But if you have asked for python, Check the piece of code that i uploaded.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(0, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(0, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }; 

const {
  Header, Content, Footer, Sider,
} = Layout;

const onClick = ({ key }) => {
  switch (key) {
    case "1":
      break;
    case "2":
      break;
    default:
      break;
  }
};

const text = <span>Code-Editor</span>;


const buttonWidth = 70;

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">Share Problem</Menu.Item>
    <Menu.Item key="2">Invite Member</Menu.Item>
    <Menu.Item key="3">Exit Group</Menu.Item>
    <Menu.Item key="4">Group Info</Menu.Item>
  </Menu>
);

class DashboardScreen extends Component {

  state = { code };

  logoutClick = () => {
    this.props.logout();
  };

  state = {
    visible: false,
    name: "",
    description: "",
  };


  onDesChange = e => {
    this.setState({
      ...this.state,
      description: e.target.value
    });
  };

  onNameChange = e => {
    this.setState({
      ...this.state,
      name: e.target.value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleOk = () => {
    const group = {
      name: this.state.name,
      descpt: this.state.description,
      createdBy: this.props.firebase.uid,
      createdAt: new Date()
    };
    this.props.createGroup(group);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      runningDiscussion: nextProps.groupDisscussion
    })
  }
  
  
    render() 
    { 
        
        const {firebase} = this.props
        if(!firebase.uid) return <Redirect to="/"/> 
        return ( 
            <React.Fragment>
                <div>
                <Row>
                    <Col span={4} className="sidebar">
                        <p className="btn"><Avatar src={this.props.firebase.photoURL} shape="circle" size="large" /><br />
                        <span><b>  {this.props.firebase.displayName}</b><br/>
                        <Button type="danger" size="small" shape="circle" onClick={this.logoutClick}><Icon type="poweroff"/></Button></span></p>
                        <hr/>
                        <div className="left-a">
                                <Sider style={{overflow: 'auto', height: '60vh', position: 'relative', left: 0}} className="side">
                                <GroupList
                                    groupSource={this.props.groups}
                                />
                                </Sider>
                        </div>

                          <div className="left-b">
                            <span className="btn"><Button type="primary" className="btna" onClick={this.showModal}>Create Group</Button></span>
                            <Modal title="Group" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                                <Input type="text" placeholder="Group name" id="name" onChange={this.onNameChange}/>
                                <Input type="text" placeholder="Group description" id="description" onChange={this.onDesChange}/>
                            </Modal>
                        </div>
                    </Col>
                    <Col span={20}>
                        <Row>
                          <MainChatArea
                            runningDiscussion = {this.state.runningDiscussion}
                            menu = {menu}
                          />
                          <ProblemsList
                            runningDiscussion = {this.state.runningDiscussion}
                          />
                        </Row>
                      </Col>
                </Row>    
                </div>
            </React.Fragment>
         );
    }
}

const mapStateToProps = state => {
  return {
    groups: state.firestore.ordered.groups,
    firebase: state.firebase.auth,
    groupDisscussion: state.chatRed.runningDiscussion,
  
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Logout()),
  createGroup: group => dispatch(CreateGroup(group))
});

export default compose(
  firestoreConnect([
    {
      collection: "users"
    },
    {
      collection: "groups"
    },
    {
      collection: "members"
    },
    {
      collection: "problems"
    },
    {
      collection: "messages"
    }
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardScreen);
