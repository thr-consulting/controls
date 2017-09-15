'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any;

var d = (0, _debug2.default)('thx:controls:RadioGroup');

/**
 * Groups React Semantic UI Radio elements into a single group
 * @class
 * @property {Component[]} children - Radio or Form.Radio components
 * @property {onChange} onChange - Standard onChange handler
 * @property {bool|number|string|Object} value - The currently selected radio item
 */
var RadioGroup = function (_Component) {
	_inherits(RadioGroup, _Component);

	function RadioGroup() {
		var _temp, _this, _ret;

		_classCallCheck(this, RadioGroup);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleChange = function (e, _ref) {
			var value = _ref.value;

			d('Value changed to:', value);
			if (_this.props.onChange) _this.props.onChange(value);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	RadioGroup.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    children = _props.children,
		    value = _props.value,
		    onChange = _props.onChange,
		    rest = _objectWithoutProperties(_props, ['children', 'value', 'onChange']);

		return _react2.default.createElement(
			_semanticUiReact.Form.Group,
			rest,
			_react.Children.map(children, function (child) {
				if (child.type.name === 'FormRadio' || child.type.name === 'Radio') {
					return _react2.default.cloneElement(child, {
						onChange: _this2.handleChange,
						checked: value === child.props.value
					});
				}
				return child;
			})
		);
	};

	return RadioGroup;
}(_react.Component);

RadioGroup.defaultProps = {
	children: null,
	onChange: null,
	value: null
};
RadioGroup.propTypes = {
	children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired : babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray).isRequired,
	onChange: require('prop-types').func.isRequired,
	value: require('prop-types').oneOfType([require('prop-types').bool, require('prop-types').number, require('prop-types').string, require('prop-types').object]).isRequired
};
RadioGroup.propTypes = {
	children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired : babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray).isRequired,
	onChange: require('prop-types').func.isRequired,
	value: require('prop-types').oneOfType([require('prop-types').bool, require('prop-types').number, require('prop-types').string, require('prop-types').object]).isRequired
};
exports.default = RadioGroup;
module.exports = exports['default'];