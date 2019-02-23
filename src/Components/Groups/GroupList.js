import React, { Component } from 'react';
import {Menu, Empty} from 'antd'
import GroupItem from './GroupItem';
import {connect} from 'react-redux'
import { ClickdGD } from '../../Store/Actions/chatAction';

class GroupList extends Component {
    
    onClick = (key) => {
        this.props.clickedGD(key)
    }

    render() { 
        const {groupSource} = this.props
        const mapGroupList = groupSource && groupSource.map((group) => { return <GroupItem onClick={this.onClick.bind(this, group[0].id)} key={group[0].id} group={group[0]}/>})

        return ( 
            <Menu  mode="inline" defaultSelectedKeys={['none']}>
                {groupSource && groupSource.length === 0 ? <Empty/> : null}
                {mapGroupList}                             
            </Menu>
         );
    }
}

const mapDispatchToProps = (dispatch) => ({
    clickedGD: (key) => dispatch(ClickdGD(key))
})

export default connect(null, mapDispatchToProps)(GroupList);
