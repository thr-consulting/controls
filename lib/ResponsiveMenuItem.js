'use strict';

exports.__esModule = true;
exports.default = ResponsiveMenuItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ResponsiveMenuItem(_ref) {
	var text = _ref.text,
	    icon = _ref.icon,
	    menuComponent = _ref.menuComponent,
	    rest = _objectWithoutProperties(_ref, ['text', 'icon', 'menuComponent']);

	var MenuComponent = menuComponent || _semanticUiReact.Menu.Item;
	return _react2.default.createElement(
		MenuComponent,
		rest,
		_react2.default.createElement(_semanticUiReact.Icon, { name: icon }),
		text
	);
}
ResponsiveMenuItem.propTypes = {
	text: require('prop-types').string,
	icon: require('prop-types').string,
	menuComponent: require('prop-types').any
};
module.exports = exports['default'];