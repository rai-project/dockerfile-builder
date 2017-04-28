import {
  connect
} from 'cerebral/react';
import React from 'react';

import uuid from 'uuid';

import './ansitheme.scss';
import './styles.css';

// look at https://github.com/getsentry/freight/blob/master/static/components/TaskDetails.jsx

export default connect({},
  class AnsiTerminal extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <div / > ;
    }
  }
);
