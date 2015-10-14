import {EventAggregator} from 'aurelia-event-aggregator';

export class App {
	static inject () { return [EventAggregator] };

	constructor (ea) {
		this.ea = ea;
		this.channel = 'myChannel';
		this.timeout = 5000;
		this.message = 'Your mother smells of elderberries'
	}

	publish () {
		this.ea.publish(this.channel, {
			text: this.message,
			action: {
				fn: function () {},
				name: 'Dismiss'
			}
		});
	}
}