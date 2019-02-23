import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Row, Col, Button, Icon, Dropdown} from 'antd'
import 'antd/dist/antd.css'
import {Redirect} from 'react-router-dom'
import { LoginWithGithub } from '../../Store/Actions/authActions';
import {connect} from 'react-redux'
import logo from '../images/logo.png'
class LoginScreen extends Component {
	
    render() { 
        const {firebase} = this.props
        if(firebase.uid) return <Redirect to="/dashboard"/>
        return ( 
            <div> 
                <div>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={4} className="upper"><img src={logo} alt="logo"/></Col>
                        <Col span={4}></Col>	
                    </Row>
                    <p className="btn">
                        <Button id="bttt" loading={this.props.login.loading} onClick={this.props.loginWithGitHub} >
                        {this.props.login.loading === false ? <Icon type="github" theme="filled" /> : null }
                         Login with GitHub
                        </Button>
                    </p>
                </div>
            </div>
            
            
            
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.auth,
    firebase: state.firebase.auth
})

const mapDispatchToProps = (dispatch) => ({
    loginWithGitHub: () => dispatch(LoginWithGithub())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);