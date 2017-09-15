'use strict';

exports.__esModule = true;
exports.default = ResponsiveMenuDropdown;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any;

function ResponsiveMenuDropdown(_ref) {
	var children = _ref.children,
	    isMobile = _ref.isMobile,
	    icon = _ref.icon,
	    text = _ref.text;

	return _react2.default.createElement(
		_semanticUiReact.Dropdown,
		{ item: true, text: text, icon: isMobile ? icon : 'dropdown' },
		_react2.default.createElement(
			_semanticUiReact.Dropdown.Menu,
			null,
			_react.Children.map(children, function (el) {
				return _react2.default.cloneElement(el, {
					menuComponent: _semanticUiReact.Dropdown.Item
				});
			})
		)
	);
}

ResponsiveMenuDropdown.propTypes = {
	isMobile: require('prop-types').bool.isRequired,
	children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray),
	icon: require('prop-types').string,
	text: require('prop-types').string
};
ResponsiveMenuDropdown.defaultProps = {
	isMobile: false
};
module.exports = exports['default'];