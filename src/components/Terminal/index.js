import { connect } from 'cerebral/react';
import React from 'react';

import uuid from 'uuid';
import { Terminal as Term } from 'react-term';
import DockerCommands from '../DockerCommands';

import './styles.css';
import './ansitheme.scss';

export default connect(
	{},
	class Terminal extends React.Component {
		constructor(props) {
			super(props);
		}
		render() {
			return <Term name={'terminal'} commandClass={DockerCommands} />;
		}
	}
);
