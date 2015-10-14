import {customElement, bindable, inlineView, bindingMode, oneWay} from 'aurelia-framework';

@customElement('snackbar')
@bindable({ name: 'eventAggregator', changeHandler: 'eventAggregatorChanged', defaultValue: null, defaultBindingMode: bindingMode.oneWay })
@bindable({ name: 'channel', changeHandler: 'channelChanged', defaultValue: null, defaultBindingMode: bindingMode.oneWay })
@bindable({ name: 'timeout', defaultValue: 2000, defaultBindingMode: bindingMode.oneWay })
@bindable({ name: 'class', defaultValue: 'snackbar', defaultBindingMode: oneWay })
@inlineView('<template class.bind="class"><div class="au-animate snackbar-item" if.bind="active"><div class="snackbar-message"><span>${text}</span></div><div class="snackbar-action"><button click.delegate="performAction()">${action.name}</button></div></div></template>')
export class Snackbar {
	constructor () {
		this.action = {
			fn: function () {}
		}
	}

	attached () {
		this.dismiss();
	}

	detached () {
		this.subscription.dispose();
		this.subscription = null;
		this.eventAggregator = null;
	}
}

// Helpers.

Snackbar.prototype.subscribe = function (ea, channel) {
	return ea.subscribe(channel, this.notify.bind(this));
};

Snackbar.prototype.notify = function (message) {
	console.log("MESSAGE IN A BOTTLE", message);
	this.dismiss();
	console.log('after dismiss');

	this.active = true;
	this.text = message.text;
	this.action.name = message.action.name;
	this.action.fn = message.action.fn;

	if (this.timeout) {
		this.timeoutId = setTimeout(this.dismiss.bind(this), this.timeout);
	}
};

Snackbar.prototype.dismiss = function () {
	clearTimeout(this.timeoutId);

	this.active = false;
	this.action.fn = function () {};
};

Snackbar.prototype.performAction = function () {
	this.action.fn();
	this.dismiss();
};

// Handlers.

Snackbar.prototype.eventAggregatorChanged = function (newValue, oldValue) {
	if (this.subscription) {
		this.subscription.dispose();
	}

	this.subscription = this.subscribe(this.eventAggregator, this.channel);
};

Snackbar.prototype.channelChanged = function (newValue, oldValue) {
	if (this.eventAggregator !== null) {
		if (this.subscription) {
			this.subscription.dispose();
		}

		this.subscription = this.subscribe(this.eventAggregator, this.channel);
	}
}