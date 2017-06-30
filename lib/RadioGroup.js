// @flow

import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import TPropTypes from 'tproptypes';
import debug from 'debug';
import {Form} from 'semantic-ui-react';

const d = debug('controls:RadioGroup');

export default class RadioGroup extends Component {
	static propTypes = {
		children: TPropTypes.reactElements,
		onChange: PropTypes.func,
		value: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.number,
			PropTypes.string,
			PropTypes.object,
		]),
	};

	static defaultProps = {
		children: null,
		onChange: null,
		value: null,
	};

	handleChange = (e: Event, {value}: {value: any}) => {
		d('Value changed to:', value);
		if (this.props.onChange) this.props.onChange(value);
	}

	render() {
		const {children, value, onChange, ...rest} = this.props;

		return (
			<Form.Group {...rest}>
				{Children.map(children, child => {
					if (child.type.name === 'FormRadio' || child.type.name === 'Radio') {
						return React.cloneElement(child, {
							onChange: this.handleChange,
							checked: value === child.props.value,
						});
					}
					return child;
				})}
			</Form.Group>
		);
	}
}
