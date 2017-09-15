'use strict';

exports.__esModule = true;
exports.default = SFormSummary;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormal = require('react-formal');

var _reactFormal2 = _interopRequireDefault(_reactFormal);

var _stringHash = require('string-hash');

var _stringHash2 = _interopRequireDefault(_stringHash);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.
 * @class
 * @property {string[]} otherErrors - An array of additional errors strings to display.
 */
function SFormSummary(props) {
	var otherErrors = props.otherErrors ? _react2.default.createElement(
		'ul',
		null,
		props.otherErrors.map(function (msg) {
			return _react2.default.createElement(
				'li',
				{ key: (0, _stringHash2.default)(msg) },
				msg
			);
		})
	) : null;

	return _react2.default.createElement(
		_semanticUiReact.Message,
		{ error: true },
		_react2.default.createElement(_reactFormal2.default.Summary, null),
		otherErrors
	);
}
SFormSummary.propTypes = {
	otherErrors: require('prop-types').arrayOf(require('prop-types').string)
};
module.exports = exports['default'];