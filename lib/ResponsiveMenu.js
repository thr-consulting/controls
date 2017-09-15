'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ResponsiveMenu;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _semanticUiReact = require('semantic-ui-react');

var _ResponsiveMenuItem = require('./ResponsiveMenuItem');

var _ResponsiveMenuItem2 = _interopRequireDefault(_ResponsiveMenuItem);

var _ResponsiveMenuDropdown = require('./ResponsiveMenuDropdown');

var _ResponsiveMenuDropdown2 = _interopRequireDefault(_ResponsiveMenuDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any;

/**
 * Displays a mobile responsive menu
 * @class
 * @property {number} mobileWidth - The number of pixels defining mobile cutoff
 * @property {Component[]} children - ResponsiveMenu.Item or ResponsiveMenu.Dropdown
 */
function ResponsiveMenu(_ref) {
	var mobileWidth = _ref.mobileWidth,
	    children = _ref.children,
	    rest = _objectWithoutProperties(_ref, ['mobileWidth', 'children']);

	var minQuery = '(min-width: ' + (mobileWidth + 1) + 'px)';
	var maxQuery = '(max-width: ' + mobileWidth + 'px)';
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			_reactResponsive2.default,
			{ query: minQuery },
			_react2.default.createElement(
				_semanticUiReact.Menu,
				rest,
				children
			)
		),
		_react2.default.createElement(
			_reactResponsive2.default,
			{ query: maxQuery },
			_react2.default.createElement(
				_semanticUiReact.Menu,
				_extends({ icon: true }, rest),
				_react.Children.map(children, function (el) {
					return _react2.default.cloneElement(el, {
						isMobile: true
					});
				})
			)
		)
	);
}

ResponsiveMenu.propTypes = {
	children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired ? babelPluginFlowReactPropTypes_proptype_ChildrenArray.isRequired : babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray).isRequired,
	mobileWidth: require('prop-types').number.isRequired
};
ResponsiveMenu.defaultProps = {
	mobileWidth: 768
};

ResponsiveMenu.Item = _ResponsiveMenuItem2.default;
ResponsiveMenu.Dropdown = _ResponsiveMenuDropdown2.default;
module.exports = exports['default'];