// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {connectToMessageContainer} from 'react-input-message';
import {Form} from 'semantic-ui-react';
import TPropTypes from 'tproptypes';

/**
 * A SemanticUI field with error markings.
 * @class
 * @memberOf module:addons/controls
 * @property {string} for - The React Formal Form.Field name.
 * @property {module:addons/TPropTypes~reactElements} children - React children elements.
 * @property {string} className - Additional class names applied to the field div.
 * @property {module:addons/TPropTypes.sFieldMessages} messages - Error messages from React Formal form.
 */
function SField(props) {
	return (
		<Form.Field
			error={!!props.messages[props.for]}
		>
			{props.children}
		</Form.Field>
	);
}

SField.propTypes = {
	for: PropTypes.string.isRequired,
	messages: TPropTypes.sFieldMessages,
	children: TPropTypes.reactElements,
};

export default connectToMessageContainer.default(SField);
