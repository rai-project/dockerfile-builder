import React from 'react'
import {connect} from 'cerebral/react'
import CodeEditor2 from '../CodeMirror'
import CodeEditor from '../Monaco'


export default connect({
},
  function App ({counts}) {
    return (
      <div id='app-wrapper'>
        <CodeEditor2 />
        <CodeEditor />
      </div>
    )
  }
)