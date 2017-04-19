import React from 'react';
import PropTypes from 'prop-types';

export default function FieldMap({value, as, asValue, onChange, ...rest}) {
	const props = {
		...rest,
		onChange: (e, data) => onChange(data[asValue]),
	};
	props[asValue] = value;

	return React.createElement(as, props);
}

FieldMap.propTypes = {
	value: PropTypes.any,
	as: PropTypes.func.isRequired,
	asValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
