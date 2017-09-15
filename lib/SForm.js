'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormal = require('react-formal');

var _reactFormal2 = _interopRequireDefault(_reactFormal);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _semanticUiReact = require('semantic-ui-react');

var _SFormSummary = require('./SFormSummary');

var _SFormSummary2 = _interopRequireDefault(_SFormSummary);

var _SField = require('./SField');

var _SField2 = _interopRequireDefault(_SField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/forbid-prop-types */


var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any;

/**
 * Renders a React Formal form using SemanticUI.
 * @class
 * @property {boolean} [showSummary=false] - If true, displays the summary above the form children.
 * @property {Components[]} children - Child React elements.
 * @property {string[]} otherErrors - An array of error strings passed to the SFormSummary.
 */
var SForm = function (_Component) {
	_inherits(SForm, _Component);

	function SForm() {
		var _temp, _this, _ret;

		_classCallCheck(this, SForm);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			error: false
		}, _this.handleError = function (e) {
			_this.setState({ error: !(0, _isEmpty2.default)(e) });
			if (_this.props.onError) _this.props.onError(e);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	// submit() {
	// 	if (this._form) this._form.submit();
	// }

	SForm.prototype.render = function render() {
		var _props = this.props,
		    showSummary = _props.showSummary,
		    otherErrors = _props.otherErrors,
		    rest = _objectWithoutProperties(_props, ['showSummary', 'otherErrors']);

		var summary = showSummary ? _react2.default.createElement(_SFormSummary2.default, { otherErrors: otherErrors }) : null;
		var error = this.state.error || !!otherErrors;

		return _react2.default.createElement(
			_semanticUiReact.Form,
			_extends({
				as: _reactFormal2.default,
				onError: this.handleError,
				error: error
			}, rest),
			summary,
			this.props.children
		);
	};

	return SForm;
}(_react.Component);

SForm.Field = _SField2.default;
SForm.Summary = _SFormSummary2.default;
SForm.defaultProps = {
	showSummary: false
};
SForm.propTypes = {
	showSummary: require('prop-types').bool.isRequired,
	otherErrors: require('prop-types').arrayOf(require('prop-types').string),
	children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray),
	onError: require('prop-types').func
};
SForm.propTypes = {
	showSummary: require('prop-types').bool.isRequired,
	otherErrors: require('prop-types').arrayOf(require('prop-types').string),
	children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray),
	onError: require('prop-types').func
};
exports.default = SForm;
module.exports = exports['default'];