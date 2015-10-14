import {customElement, bindable, inlineView, bindingMode, oneWay} from 'aurelia-framework';

@customElement('snackbar')
@bindable({ name: 'eventAggregator', changeHandler: 'eventAggregatorChanged', defaultValue: null, defaultBindingMode: bindingMode.oneWay })
@bindable({ name: 'channel', changeHandler: 'channelChanged', defaultValue: null, defaultBindingMode: bindingMode.oneWay })
@bindable({ name: 'timeout', changeHandler: 'timeoutChanged', defaultValue: 2000, defaultBindingMode: bindingMode.oneWay })
@bindable({ name: 'class', defaultValue: 'snackbar', defaultBindingMode: oneWay })
// @inlineView('<template class.bind="class"><require from="./snackbar.css!"></require><div class="au-animate snackbar-item" show.bind="active"><div class="snackbar-message"><span>${text}</span></div><div class="snackbar-action"><button click.delegate="performAction()">${action.name}</button></div></div></template>')
export class Snackbar {
	attached () {
		this.dismiss();

		if (this.eventAggregator !== null) {
			this.subscription = this.subscribe(this.eventAggregator, this.channel);
		}
	}

	detached () {
		this.subscription.dispose();
		this.subscription = null;
		this.eventAggregator = null;
	}
}

// Helpers.

Snackbar.prototype.subscribe = function (ea, channel) {
	return ea.subscribe(channel, notify.bind(this));
};

Snackbar.prototype.notify = function (message) {
	this.dismiss();

	this.text = message.text;
	this.action.name = message.action.name;
	this.action.fn = message.action.fn;
	this.active = true;

	if (this.timeout) {
		this.timeoutId = setTimeout(() => {
			dismiss();
		}, this.timeout);
	}
};

Snackbar.prototype.dismiss = function () {
	clearTimeout(this.timeoutId);

	this.active = false;
	this.text = '';
	this.action = {
		fn: function () {},
		name: ''
	};
};

Snackbar.prototype.performAction = function () {
	this.action.fn();
	dismiss();
};

// Handlers.

Snackbar.prototype.eventAggregatorChanged = function (newValue, oldValue) {
	this.subscription.dispose();
	this.subscription = this.subscribe(this.eventAggregator, this.channel);
};

Snackbar.prototype.channelChanged = function (newValue, oldValue) {
	if (this.eventAggregator !== null) {
		this.subscription.dispose();
		this.subscription = this.subscribe(this.eventAggregator, this.channel);
	}
}