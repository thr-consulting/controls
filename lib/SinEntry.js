'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFormal = require('react-formal');

var _semanticUiReact = require('semantic-ui-react');

var _tschemas = require('@thx/tschemas');

var _tschemas2 = _interopRequireDefault(_tschemas);

var _SForm = require('./SForm');

var _SForm2 = _interopRequireDefault(_SForm);

var _MaskedInput = require('./MaskedInput');

var _MaskedInput2 = _interopRequireDefault(_MaskedInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SinEntry = function (_Component) {
	_inherits(SinEntry, _Component);

	function SinEntry() {
		var _temp, _this, _ret;

		_classCallCheck(this, SinEntry);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			edit: false
		}, _this.handleEdit = function () {
			_this.setState({ edit: true });
		}, _this.handleCancel = function () {
			_this.setState({ edit: false });
		}, _this.handleSubmit = function (data) {
			if (_this.props.onChange) _this.props.onChange(data);
			_this.setState({ edit: false });
		}, _this.handleClear = function () {
			if (_this.props.onChange) _this.props.onChange(null);
			_this.setState({ edit: false });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	SinEntry.prototype.render = function render() {
		if (this.state.edit) {
			return _react2.default.createElement(
				_SForm2.default,
				{
					schema: _tschemas2.default.sin(),
					onSubmit: this.handleSubmit,
					showSummary: true
				},
				_react2.default.createElement(
					_SForm2.default.Field,
					{ 'for': 'sin' },
					_react2.default.createElement(
						_semanticUiReact.Input,
						{ type: 'text', action: true },
						_react2.default.createElement(_reactFormal.Field, { type: _MaskedInput2.default, name: 'sin', mask: { mask: '999-999-999' } }),
						_react2.default.createElement(
							_semanticUiReact.Button,
							{ color: 'green' },
							_react2.default.createElement(_semanticUiReact.Icon, { name: 'checkmark' }),
							'Save'
						),
						_react2.default.createElement(
							_semanticUiReact.Button,
							{ color: 'red', onClick: this.handleCancel },
							'Cancel'
						)
					)
				)
			);
		}

		if (this.props.value) {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_semanticUiReact.Button.Group,
					null,
					_react2.default.createElement(_semanticUiReact.Button, {
						color: 'teal',
						content: 'SIN Entered',
						icon: 'checkmark'
					}),
					_react2.default.createElement(
						_semanticUiReact.Button,
						{ color: 'grey', onClick: this.handleEdit },
						'Re-enter SIN'
					),
					_react2.default.createElement(_semanticUiReact.Button.Or, null),
					_react2.default.createElement(
						_semanticUiReact.Button,
						{ onClick: this.handleClear },
						'Clear SIN'
					)
				)
			);
		}
		return _react2.default.createElement(
			_semanticUiReact.Button,
			{ onClick: this.handleEdit },
			'Enter SIN'
		);
	};

	return SinEntry;
}(_react.Component);

SinEntry.defaultProps = {
	value: false
};
SinEntry.propTypes = {
	value: require('prop-types').bool.isRequired,
	onChange: require('prop-types').func
};
SinEntry.propTypes = {
	value: require('prop-types').bool.isRequired,
	onChange: require('prop-types').func
};
exports.default = SinEntry;
module.exports = exports['default'];