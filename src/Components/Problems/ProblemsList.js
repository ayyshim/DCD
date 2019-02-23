import React, { Component } from 'react';
import {Col, Layout} from 'antd'
import ProblemItem from './ProblemItem';
import {connect} from 'react-redux'
import { ClickedProblem } from '../../Store/Actions/problemActions';
const {
Sider,
  } = Layout;
class ProblemsList extends Component {
    state = { 
        solutionVisible: false
    }

    onClick = (problem) => {
        this.props.clickProblem(problem)
        
    }


   

    render() { 
        var i = -1;
        const mapProblem = this.props.list_problems && this.props.list_problems.map((problem) => { 
            i++
             return (
            <ProblemItem key={problem.id} index={i} onClick={this.onClick.bind(this, problem)} problem={problem}/>    
        )})
        return ( 
            <Col span={6} id="activity-box">
                        <p className="up txt-center" id="grp-name">Activity Logs</p>
                        <Sider style={{overflow: 'auto', height: '60vh', position: 'relative', right: 0}} className="side">
                            {mapProblem}
                        </Sider>
                        </Col>
         );
    }
}

const mapStateToProps = (state, ownProps) => {
    const key = ownProps.runningDiscussion
    const problems = state.firestore.ordered.problems
    const list_problems = problems && problems.filter((p) => {return p.g_id===key})
    return {
        list_problems
    }
}

const mapDispatchToProps = (dispatch) => ({
    clickProblem : (problem) => dispatch(ClickedProblem(problem))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsList);