import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import {Button} from 'antd';
import fs from 'fs'
const code = `Enter Code Here!!!
`;
 
class Test extends React.Component {
  state = { code };
  
  componentDidMount() {
    this.loadData()
  }

  render() {
    
    return (
      <div>
      <Editor
        value={this.state.code}
        onValueChange={code => this.setState({ code })}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <br/>
      <Button style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary">
              Submit
            </Button>
            </div>
    );
  }
}

export default Test;