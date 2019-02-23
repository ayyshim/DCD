import React from 'react'
import {Menu, Icon} from 'antd'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};


const GroupItem = (props) => (
  <Menu.Item key={props.group.id} id="li-hover"
        onClick={props.onClick}
        onMouseEnter={_=>_}
        onItemHover = {_=>_}
    >
        <Icon type="user" />
        <span className="txt">{props.group.name}</span>
    </Menu.Item>
)

export default GroupItem