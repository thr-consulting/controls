'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInputMessage = require('react-input-message');

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any;

/**
 * A SemanticUI field with error markings.
 * @class
 * @property {string} for - The React Formal Form.Field name.
 * @property {Component[]} children - React children elements.
 * @property {string} className - Additional class names applied to the field div.
 * @property {Object[]} messages - Error messages from React Formal form.
 */
function SField(props) {
	return _react2.default.createElement(
		_semanticUiReact.Form.Field,
		{
			error: !!props.messages[props.for]
		},
		props.children
	);
}

SField.propTypes = {
	for: require('prop-types').string.isRequired,
	messages: require('prop-types').object.isRequired,
	children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray)
};
exports.default = _reactInputMessage.connectToMessageContainer.default(SField);
module.exports = exports['default'];