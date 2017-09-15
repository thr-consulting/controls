'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = FieldMap;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Maps onChange handler parameters from (event, data) to just (data).
 * @class
 * @property {*} value - The value of the field
 * @property {Component} as - The React Component to render
 * @property {string} asValue
 * @property {onChange} onChange - The normal onChange handler
 */
function FieldMap(_ref) {
	var value = _ref.value,
	    as = _ref.as,
	    asValue = _ref.asValue,
	    onChange = _ref.onChange,
	    rest = _objectWithoutProperties(_ref, ['value', 'as', 'asValue', 'onChange']);

	var props = _extends({}, rest, {
		onChange: function (_onChange) {
			function onChange(_x, _x2) {
				return _onChange.apply(this, arguments);
			}

			onChange.toString = function () {
				return _onChange.toString();
			};

			return onChange;
		}(function (e, data) {
			return onChange(data[asValue]);
		})
	});
	props[asValue] = value;

	return _react2.default.createElement(as, props);
}
FieldMap.propTypes = {
	value: require('prop-types').any.isRequired,
	as: require('prop-types').func.isRequired,
	asValue: require('prop-types').string.isRequired,
	onChange: require('prop-types').func.isRequired
};
module.exports = exports['default'];