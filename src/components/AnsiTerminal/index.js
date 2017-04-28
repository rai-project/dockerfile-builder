import { connect } from 'cerebral/react';
import React from 'react';

import uuid from 'uuid';

import './styles.css';

export default connect(
	{},
	class AnsiTerminal extends React.Component {
		constructor(props) {
			super(props);
		}
		render() {
			return <div />;
		}
	}
);
