import React from 'react';
import PropTypes from 'prop-types';

/**
 * Maps onChange handler parameters from (event, data) to just (data).
 * @class
 * @property {*} value - The value of the field
 * @property {Component} as - The React Component to render
 * @property {string} asValue
 * @property {onChange} onChange - The normal onChange handler
 */
export default function FieldMap({value, as, asValue, onChange, ...rest}) {
	const props = {
		...rest,
		onChange: (e, data) => onChange(data[asValue]),
	};
	props[asValue] = value;

	return React.createElement(as, props);
}

FieldMap.propTypes = {
	value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
	as: PropTypes.func.isRequired,
	asValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
