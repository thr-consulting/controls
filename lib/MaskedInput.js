'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

require('inputmask/dist/inputmask/inputmask.numeric.extensions');

var _inputmask = require('inputmask');

var _inputmask2 = _interopRequireDefault(_inputmask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
 * hundreds of these on one screen at the same time.
 * @class
 * @property {string|number} [value=null] - The value to display
 * @property {onChange} [onChange=null] - Called when the value changes.
 * @property {inputmaskPropTypes} [mask=null] - The mask object specified at {@link https://github.com/RobinHerbots/jquery.inputmask|here}.
 */


/**
 * See source code for detailed prop types or {@link https://github.com/RobinHerbots/jquery.inputmask|here} for more info.
 * @typedef {Object} inputmaskPropTypes
 */

var MaskedInput = function (_Component) {
	_inherits(MaskedInput, _Component);

	function MaskedInput() {
		var _temp, _this, _ret;

		_classCallCheck(this, MaskedInput);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleComplete = function (ev) {
			if (_this.props.onChange) _this.props.onChange(ev.target.value);
		}, _this.handleCleared = function () {
			if (_this.props.onChange) _this.props.onChange('');
		}, _this.handleIncomplete = function (ev) {
			if (_this.props.onChange) _this.props.onChange(ev.target.value);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	MaskedInput.prototype.componentDidMount = function componentDidMount() {
		if (this.props.value && this._input) this._input.value = this.props.value;
		var im = new _inputmask2.default(_extends({}, this.props.mask, {
			oncomplete: this.handleComplete,
			oncleared: this.handleCleared,
			onincomplete: this.handleIncomplete
		}));
		im.mask(this._input);
	};

	MaskedInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value && this._input) {
			this._input.value = this.props.value || '';
		}
		if (prevProps.mask !== this.props.mask) {
			var im = new _inputmask2.default(_extends({}, this.props.mask, {
				oncomplete: this.handleComplete,
				oncleared: this.handleCleared,
				onincomplete: this.handleIncomplete
			}));
			im.mask(this._input);
		}
	};

	MaskedInput.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    value = _props.value,
		    onChange = _props.onChange,
		    mask = _props.mask,
		    rest = _objectWithoutProperties(_props, ['value', 'onChange', 'mask']);

		return _react2.default.createElement(
			_semanticUiReact.Input,
			rest,
			_react2.default.createElement('input', { ref: function ref(r) {
					return _this2._input = r;
				} })
		);
	};

	return MaskedInput;
}(_react.Component);

MaskedInput.defaultProps = {
	value: null,
	onChange: null,
	mask: null
};
MaskedInput.propTypes = {
	value: require('prop-types').string,
	onChange: require('prop-types').func,
	mask: require('prop-types').shape({
		placeholder: require('prop-types').string,
		optionalmarker: require('prop-types').shape({
			start: require('prop-types').string.isRequired,
			end: require('prop-types').string.isRequired
		}),
		quantifiermarker: require('prop-types').shape({
			start: require('prop-types').string.isRequired,
			end: require('prop-types').string.isRequired
		}),
		groupmarker: require('prop-types').shape({
			start: require('prop-types').string.isRequired,
			end: require('prop-types').string.isRequired
		}),
		alternatormarker: require('prop-types').string,
		escapeChar: require('prop-types').string,
		mask: require('prop-types').string.isRequired,
		repeat: require('prop-types').number,
		greedy: require('prop-types').bool,
		autoUnmask: require('prop-types').bool,
		removeMaskOnSubmit: require('prop-types').bool,
		clearMaskOnLostFocus: require('prop-types').bool,
		insertMode: require('prop-types').bool,
		clearIncomplete: require('prop-types').bool,
		alias: require('prop-types').string,
		onKeyDown: require('prop-types').func,
		onBeforeMask: require('prop-types').func,
		onBeforePaste: require('prop-types').func,
		onBeforeWrite: require('prop-types').func,
		onUnMask: require('prop-types').func,
		showMaskOnFocus: require('prop-types').bool,
		showMaskOnHover: require('prop-types').bool,
		onKeyValidation: require('prop-types').func,
		numericInput: require('prop-types').bool,
		rightAlign: require('prop-types').bool,
		undoOnEscape: require('prop-types').bool,
		radixPoint: require('prop-types').string,
		groupSeparator: require('prop-types').string,
		keepStatic: require('prop-types').bool,
		positionCaretOnTab: require('prop-types').bool,
		tabThrough: require('prop-types').bool,
		isComplete: require('prop-types').func,
		canClearPosition: require('prop-types').func,
		postValidation: require('prop-types').func,
		preValidation: require('prop-types').func,
		staticDefinitionSymbol: require('prop-types').string,
		nullable: require('prop-types').bool,
		positionCaretOnClick: require('prop-types').string,
		casing: require('prop-types').string,
		inputmode: require('prop-types').string,
		colorMask: require('prop-types').string
	})
};
MaskedInput.propTypes = {
	value: require('prop-types').string,
	onChange: require('prop-types').func,
	mask: require('prop-types').shape({
		placeholder: require('prop-types').string,
		optionalmarker: require('prop-types').shape({
			start: require('prop-types').string.isRequired,
			end: require('prop-types').string.isRequired
		}),
		quantifiermarker: require('prop-types').shape({
			start: require('prop-types').string.isRequired,
			end: require('prop-types').string.isRequired
		}),
		groupmarker: require('prop-types').shape({
			start: require('prop-types').string.isRequired,
			end: require('prop-types').string.isRequired
		}),
		alternatormarker: require('prop-types').string,
		escapeChar: require('prop-types').string,
		mask: require('prop-types').string.isRequired,
		repeat: require('prop-types').number,
		greedy: require('prop-types').bool,
		autoUnmask: require('prop-types').bool,
		removeMaskOnSubmit: require('prop-types').bool,
		clearMaskOnLostFocus: require('prop-types').bool,
		insertMode: require('prop-types').bool,
		clearIncomplete: require('prop-types').bool,
		alias: require('prop-types').string,
		onKeyDown: require('prop-types').func,
		onBeforeMask: require('prop-types').func,
		onBeforePaste: require('prop-types').func,
		onBeforeWrite: require('prop-types').func,
		onUnMask: require('prop-types').func,
		showMaskOnFocus: require('prop-types').bool,
		showMaskOnHover: require('prop-types').bool,
		onKeyValidation: require('prop-types').func,
		numericInput: require('prop-types').bool,
		rightAlign: require('prop-types').bool,
		undoOnEscape: require('prop-types').bool,
		radixPoint: require('prop-types').string,
		groupSeparator: require('prop-types').string,
		keepStatic: require('prop-types').bool,
		positionCaretOnTab: require('prop-types').bool,
		tabThrough: require('prop-types').bool,
		isComplete: require('prop-types').func,
		canClearPosition: require('prop-types').func,
		postValidation: require('prop-types').func,
		preValidation: require('prop-types').func,
		staticDefinitionSymbol: require('prop-types').string,
		nullable: require('prop-types').bool,
		positionCaretOnClick: require('prop-types').string,
		casing: require('prop-types').string,
		inputmode: require('prop-types').string,
		colorMask: require('prop-types').string
	})
};
exports.default = MaskedInput;
module.exports = exports['default'];