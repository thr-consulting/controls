import React, {PropTypes} from 'react';
import Form from 'react-formal';
import hash from 'string-hash';

/**
 * Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.
 * @memberOf module:addons/controls
 * @class
 * @property {string[]} otherErrors - An array of additional errors strings to display.
 */
export default function SFormSummary(props) {
	const otherErrors = (props.otherErrors) ? (<ul>
		{props.otherErrors.map(msg => <li key={hash(msg)}>{msg}</li>)}
	</ul>) : null;

	return (
		<div className="ui error message">
			<Form.Summary/>
			{otherErrors}
		</div>
	);
}

SFormSummary.propTypes = {
	otherErrors: PropTypes.arrayOf(PropTypes.string),
};
