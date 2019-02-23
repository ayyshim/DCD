import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { Logout } from '../../Store/Actions/authActions';
import { CreateGroup } from '../../Store/Actions/dashboardAction';
import {Row, Col, Avatar} from 'antd';
import {Button, Input,Layout, Modal} from 'antd';
import { firestoreConnect } from "react-redux-firebase";
import GroupList from '../Groups/GroupList'
import MainChatArea from '../ChatArea/MainArea';
import ProblemsList from '../Problems/ProblemsList';
import { push_uniq } from 'terser';


const {
  Sider,
} = Layout;


class DashboardScreen extends Component {

  state = { };

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
      adminName: this.props.fi.profile.username,
      createdAt: new Date()
    };
    
    this.props.createGroup(group);
    this.setState({
      visible: false
    })
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      runningDiscussion: nextProps.groupDisscussion
    })
  }
  
  
    render() 
    { 
        console.log(this.props.problems)  
        const {firebase} = this.props
        if(!firebase.uid) return <Redirect to="/"/> 
        return ( 
            <React.Fragment>
                <div>
                <Row>
                    <Col span={4} className="sidebar">
                        <p className="btn"><br/><Avatar src={this.props.firebase.photoURL} shape="circle" size="large" /><br />
                        <span><b>  {this.props.firebase.displayName ? this.props.firebase.displayName : this.fi.profile.username}</b><br/>
                        <Button type="danger" onClick={this.logoutClick}>Logout</Button></span></p>
                        <hr/>
                        <div className="left-a">
                                <Sider style={{overflow: 'auto', height: '60vh', position: 'relative', left: 0}} className="side">
                                <GroupList
                                    groupSource={this.props.groups}
                                />
                                </Sider>
                        </div>

                          <div className="left-b">
                            <span className="btn"><Button type="primary" onClick={this.showModal}>Create Discussion Group</Button></span>
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
  const members = state.firestore.ordered.members
  const groups = state.firestore.ordered.groups
  var groupsIn = []
  members && members.map((member) => {
    if(member.name === state.firebase.profile.username) {
      groupsIn.push(member.g_id)
    }
  })
  
  var groupsList = []
  groupsIn.map((gid)=> {
    groupsList.push(groups.filter((group) => {return group.id === gid}))
  })

  return {
    groups: groupsList,
    firebase: state.firebase.auth,
    fi: state.firebase,
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
      collection: "groups",
    },
    {
      collection: "members"
    },
    {
      collection: "problems",
      orderBy: ['created_at']
    },
    {
      collection: "messages",
      orderBy: ['createdAt', 'desc']
    }
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardScreen);
