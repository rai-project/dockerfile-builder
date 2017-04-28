import { Controller } from 'cerebral';
import Devtools from 'cerebral/devtools';

import UseragentModule from 'cerebral-module-useragent';
import FirebaseProvider from 'cerebral-provider-firebase';
import HttpProvider from 'cerebral-provider-http';

import app from './modules/app';
import shortcuts from './modules/shortcuts';

const controller = Controller({
	// You do not want to run the devtools in production as it
	// requires a bit of processing and memory to send data from
	// your application
	devtools: process.env.NODE_ENV === 'production'
		? null
		: Devtools({
				// If running standalone debugger. Some environments
				// might require 127.0.0.1 or computer IP address
				remoteDebugger: 'localhost:8585',

				// By default the devtools tries to reconnect
				// to debugger when it can not be reached, but
				// you can turn it off
				reconnect: true,
			}),
	modules: {
		app,
		shortcuts: shortcuts({
			'cmd+s': 'app.saveClicked',
			'ctrl+s': 'app.saveClicked',
		}),
	},
	providers: [
		// FirebaseProvider({
		// 	config: config.firebaseConfig,
		// }),
		HttpProvider(),
	],
});

export default controller;
