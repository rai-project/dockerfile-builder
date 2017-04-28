import { CommandClass, add_command } from 'react-term';

export default class ExampleShell extends CommandClass {
	constructor() {
		super(...arguments);

		this.prompt = '[~] $';
		this.define_command('test');
		this.define_command('age');
		this.define_command('args');
	}

	define_command(name) {
		add_command(name, name);
	}

	test() {
		this.writeln('test!');
	}

	age() {
		let res = this.ask('How old are you?');

		res.then(answer => {
			this.writeln(`You are ${answer} years old!`);
		});
	}

	args(args) {
		this.writeln(args);
	}
}
