// @flow

/* eslint-disable react/forbid-prop-types */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Formal from 'react-formal';
import isEmpty from 'lodash/isEmpty';
import TPropTypes from '@thx/tproptypes';
import {Form} from 'semantic-ui-react';
import SFormSummary from './SFormSummary';
import SField from './SField';

/**
 * Renders a React Formal form using SemanticUI.
 * @class
 * @property {boolean} [showSummary=false] - If true, displays the summary above the form children.
 * @property {Components[]} children - Child React elements.
 * @property {string[]} otherErrors - An array of error strings passed to the SFormSummary.
 */
export default class SForm extends Component {
	static Field = SField;
	static Summary = SFormSummary;

	static propTypes = {
		showSummary: PropTypes.bool,
		otherErrors: PropTypes.arrayOf(PropTypes.string),
		children: TPropTypes.reactElements,
		onError: PropTypes.func,
	};

	static defaultProps = {
		showSummary: false,
	};

	state = {
		error: false,
	};

	_form: HTMLFormElement;

	handleError = (e: Event) => {
		this.setState({error: !isEmpty(e)});
		if (this.props.onError) this.props.onError(e);
	}

	submit() {
		this._form.submit();
	}

	render() {
		const {showSummary, otherErrors, ...rest} = this.props;
		const summary = showSummary ? <SFormSummary otherErrors={otherErrors}/> : null;
		const error = this.state.error || !!otherErrors;

		return (
			<Form
				as={Formal}
				onError={this.handleError}
				error={error}
				ref={node => (this._form = node)}
				{...rest}
			>
				{summary}
				{this.props.children}
			</Form>
		);
	}
}
