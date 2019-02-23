import React from 'react'
import {Button, Popover} from 'antd'
const ProblemItem = (props) => (
                        <Popover placement="topLeft" title={props.problem.by} content={<p>{props.problem.filename}</p>} trigger="click">
                              <Button id="right-panel">Open with editor</Button>
                            </Popover>)

export default ProblemItem