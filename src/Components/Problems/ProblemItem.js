import React from 'react'
import {Button, Popover} from 'antd'
const ProblemItem = (props) => (
                        <Popover placement="topLeft" title={props.problem.problem_title} content={<p>Code editor</p>} trigger="click">
                              <Button onClick={props.onClick} id="right-panel">{props.problem.problem_title}</Button>
                            </Popover>)

export default ProblemItem