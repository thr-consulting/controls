// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'semantic-ui-react';
import 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import Inputmask from 'inputmask';

/**
 * See source code for detailed prop types or {@link https://github.com/RobinHerbots/jquery.inputmask|here} for more info.
 * @typedef {Object} inputmaskPropTypes
 */

/**
 * Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
 * hundreds of these on one screen at the same time.
 * @class
 * @property {string|number} [value=null] - The value to display
 * @property {onChange} [onChange=null] - Called when the value changes.
 * @property {inputmaskPropTypes} [mask=null] - The mask object specified at {@link https://github.com/RobinHerbots/jquery.inputmask|here}.
 * @property {string} [emptyValue=''] - The value to display when the field is empty.
 */
export default class MaskedInput extends Component {
	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		onChange: PropTypes.func,
		emptyValue: PropTypes.string,
		mask: PropTypes.shape({
			placeholder: PropTypes.string,
			optionalmarker: PropTypes.shape({
				start: PropTypes.string,
				end: PropTypes.string,
			}),
			quantifiermarker: PropTypes.shape({
				start: PropTypes.string,
				end: PropTypes.string,
			}),
			groupmarker: PropTypes.shape({
				start: PropTypes.string,
				end: PropTypes.string,
			}),
			alternatormarker: PropTypes.string,
			escapeChar: PropTypes.string,
			mask: PropTypes.string,
			repeat: PropTypes.number,
			greedy: PropTypes.bool,
			autoUnmask: PropTypes.bool,
			removeMaskOnSubmit: PropTypes.bool,
			clearMaskOnLostFocus: PropTypes.bool,
			insertMode: PropTypes.bool,
			clearIncomplete: PropTypes.bool,
			alias: PropTypes.string,
			onKeyDown: PropTypes.func,
			onBeforeMask: PropTypes.func,
			onBeforePaste: PropTypes.func,
			onBeforeWrite: PropTypes.func,
			onUnMask: PropTypes.func,
			showMaskOnFocus: PropTypes.bool,
			showMaskOnHover: PropTypes.bool,
			onKeyValidation: PropTypes.func,
			numericInput: PropTypes.bool,
			rightAlign: PropTypes.bool,
			undoOnEscape: PropTypes.bool,
			radixPoint: PropTypes.string,
			groupSeparator: PropTypes.string,
			keepStatic: PropTypes.bool,
			positionCaretOnTab: PropTypes.bool,
			tabThrough: PropTypes.bool,
			isComplete: PropTypes.func,
			canClearPosition: PropTypes.func,
			postValidation: PropTypes.func,
			staticDefinitionSymbol: PropTypes.string,
			nullable: PropTypes.bool,
			positionCaretOnClick: PropTypes.string,
			casing: PropTypes.string,
			inputmode: PropTypes.string,
			colorMask: PropTypes.string,
		}),
	};

	static defaultProps = {
		value: null,
		onChange: null,
		mask: null,
		emptyValue: '',
	};

	componentDidMount() {
		if (this.props.value) this._input.value = this.props.value;
		const im = new Inputmask({
			...this.props.mask,
			oncomplete: this.handleComplete,
			oncleared: this.handleCleared,
			onincomplete: this.handleIncomplete,
		});
		im.mask(this._input);
	}

	componentDidUpdate(prevProps: Object) {
		if (prevProps.value !== this.props.value) {
			this._input.value = this.props.value;
		}
		if (prevProps.mask !== this.props.mask) {
			const im = new Inputmask({
				...this.props.mask,
				oncomplete: this.handleComplete,
				oncleared: this.handleCleared,
				onincomplete: this.handleIncomplete,
			});
			im.mask(this._input);
		}
	}

	_input: HTMLInputElement;

	handleComplete = (ev: Object) => {
		if (this.props.onChange) this.props.onChange(ev.target.value);
	}

	handleCleared = () => {
		if (this.props.onChange) this.props.onChange(this.props.emptyValue);
	}

	handleIncomplete = (ev: Object) => {
		if (this.props.onChange) this.props.onChange(ev.target.value);
	}

	render() {
		const {value, onChange, emptyValue, mask, ...rest} = this.props;
		return (
			<Input {...rest}>
				<input ref={r => (this._input = r)}/>
			</Input>
		);
	}
}
