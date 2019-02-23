import React from 'react'
import {Menu, Icon} from 'antd'

const GroupItem = (props) => (
    <Menu.Item key={props.group.id}
        onClick={props.onClick}
        onMouseEnter={_=>_}
        onItemHover = {_=>_}
    >
        <Icon type="user" />
        <span className="txt">{props.group.name}</span>
    </Menu.Item>
)

export default GroupItem