'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaFramework = require('aurelia-framework');

var Snackbar = (function () {
	function Snackbar() {
		_classCallCheck(this, _Snackbar);
	}

	_createClass(Snackbar, [{
		key: 'attached',
		value: function attached() {
			this.dismiss();

			if (this.eventAggregator !== null) {
				this.subscription = this.subscribe(this.eventAggregator, this.channel);
			}
		}
	}, {
		key: 'detached',
		value: function detached() {
			this.subscription.dispose();
			this.subscription = null;
			this.eventAggregator = null;
		}
	}]);

	var _Snackbar = Snackbar;
	Snackbar = (0, _aureliaFramework.bindable)({ name: 'class', defaultValue: 'snackbar', defaultBindingMode: _aureliaFramework.oneWay })(Snackbar) || Snackbar;
	Snackbar = (0, _aureliaFramework.bindable)({ name: 'timeout', changeHandler: 'timeoutChanged', defaultValue: 2000, defaultBindingMode: _aureliaFramework.bindingMode.oneWay })(Snackbar) || Snackbar;
	Snackbar = (0, _aureliaFramework.bindable)({ name: 'channel', changeHandler: 'channelChanged', defaultValue: null, defaultBindingMode: _aureliaFramework.bindingMode.oneWay })(Snackbar) || Snackbar;
	Snackbar = (0, _aureliaFramework.bindable)({ name: 'eventAggregator', changeHandler: 'eventAggregatorChanged', defaultValue: null, defaultBindingMode: _aureliaFramework.bindingMode.oneWay })(Snackbar) || Snackbar;
	Snackbar = (0, _aureliaFramework.customElement)('snackbar')(Snackbar) || Snackbar;
	return Snackbar;
})();

exports.Snackbar = Snackbar;

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
		this.timeoutId = setTimeout(function () {
			dismiss();
		}, this.timeout);
	}
};

Snackbar.prototype.dismiss = function () {
	clearTimeout(this.timeoutId);

	this.active = false;
	this.text = '';
	this.action = {
		fn: function fn() {},
		name: ''
	};
};

Snackbar.prototype.performAction = function () {
	this.action.fn();
	dismiss();
};

Snackbar.prototype.eventAggregatorChanged = function (newValue, oldValue) {
	this.subscription.dispose();
	this.subscription = this.subscribe(this.eventAggregator, this.channel);
};

Snackbar.prototype.channelChanged = function (newValue, oldValue) {
	if (this.eventAggregator !== null) {
		this.subscription.dispose();
		this.subscription = this.subscribe(this.eventAggregator, this.channel);
	}
};