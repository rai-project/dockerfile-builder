import { connect } from 'cerebral/react';
import React from 'react';

import uuid from 'uuid';
import { hterm, lib } from 'hterm-umdjs';

import './styles.css';
import './ansitheme.scss';

hterm.defaultStorage = new lib.Storage.Memory();

export default connect(
	{},
	class Terminal extends React.Component {
		constructor(props) {
			super(props);
			this.terminalElement = null;
			this.term = null;
			this.state = { isLoading: false };
		}
		componentDidMount() {
			this.term = new hterm.Terminal(uuid.v4());
			this.term.decorate(this.terminalElement);
			this.term.installKeyboard();
			this.state.isLoading = false;
			this.term.onTerminalReady = () => {
				this.state.isLoading = false;
			};

			let data = `<br />xxx`;
			this.term.io.println(data);
		}
		render() {
			return (
				<div
					ref={node => {
						this.terminalElement = node;
					}}
					className="editor">
					{this.state.isLoading ? 'loading terminal...' : null}
				</div>
			);
		}
	}
);
