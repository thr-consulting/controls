/* eslint-disable react/forbid-prop-types */
import React, {Component, PropTypes} from 'react';
import {default as Formal} from 'react-formal';
import isEmpty from 'lodash/isEmpty';
import TPropTypes from 'tproptypes';
import {Form} from 'semantic-ui-react';
import SFormSummary from './SFormSummary';
import SField from './SField';

/**
 * Renders a React Formal form using SemanticUI.
 * @memberOf module:addons/controls
 * @class
 * @property {boolean} [showSummary=false] - If true, displays the summary above the form children.
 * @property {module:addons/TPropTypes~reactElements} children - Child React elements.
 * @property {boolean} [loading=false] - If true, displays a loader over the form.
 * @property {string[]} otherErrors - An array of error strings passed to the SFormSummary.
 */
export default class SForm extends Component {
	static propTypes = {
		showSummary: PropTypes.bool,
		loading: PropTypes.bool,
		otherErrors: PropTypes.arrayOf(PropTypes.string),
		children: TPropTypes.reactElements,
		// React Formal props
		schema: PropTypes.object.isRequired,
		value: PropTypes.object,
		onSubmit: PropTypes.func,
		onInvalidSubmit: PropTypes.func,
		onChange: PropTypes.func,
		onError: PropTypes.func,
		onValidate: PropTypes.func,
		delay: PropTypes.number,
		strict: PropTypes.bool,
		noValidate: PropTypes.bool,
		component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
		context: PropTypes.object,
		debug: PropTypes.bool,
	};

	static defaultProps = {
		showSummary: false,
		loading: false,
	};

	state = {
		error: false,
	};

	handleError = e => {
		this.setState({error: !isEmpty(e)});
		if (this.props.onError) this.props.onError(e);
	}

	submit() {
		this._form.submit();
	}

	render() {
		const summary = (this.props.showSummary) ? <SFormSummary otherErrors={this.props.otherErrors}/> : null;
		const error = this.state.error || !!this.props.otherErrors;

		return (
			<Form
				as={Formal}
				onError={this.handleError}
				error={error}
				loading={this.props.loading}
				ref={node => (this._form = node)}
				schema={this.props.schema}
				value={this.props.value}
				onSubmit={this.props.onSubmit}
				onInvalidSubmit={this.props.onInvalidSubmit}
				onChange={this.props.onChange}
				onValidate={this.props.onValidate}
				delay={this.props.delay}
				strict={this.props.strict}
				noValidate={this.props.noValidate}
				component={this.props.component}
				context={this.props.context}
				debug={this.props.debug}
			>
				{summary}
				{this.props.children}
			</Form>
		);
	}
}

SForm.Field = SField;
SForm.Summary = SFormSummary;
