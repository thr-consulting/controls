import React, {Component, PropTypes} from 'react';
import {Input} from 'semantic-ui-react';
import Inputmask from 'inputmask';
import 'inputmask.extensions';
import 'inputmask.numeric.extensions';

/**
 * See source for detailed prop types or {@link https://github.com/RobinHerbots/jquery.inputmask|here} for more info.
 * @memberOf module:addons/controls.SMaskedInput
 * @typedef inputmaskPropTypes
 */

/**
 * Displays a masked input form. Warning: this component uses jquery for masking so it renders quite slow. Do not use
 * hundreds of these on one screen at the same time.
 * @memberOf module:addons/controls
 * @class
 * @property {string|number} value - The value to display
 * @property {onChange} onChange - Called when the value changes.
 * @property {module:addons/controls.SMaskedInput.inputmaskPropTypes} mask - The mask object specified at {@link https://github.com/RobinHerbots/jquery.inputmask|here}.
 * @property {string} emptyValue - The value to display when the field is empty.
 */
export default class MaskedInput extends Component {
	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		onChange: PropTypes.func,
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
		emptyValue: PropTypes.string,
	};

	static defaultProps = {
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

	componentDidUpdate(prevProps) {
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

	handleComplete = ev => {
		if (this.props.onChange) this.props.onChange(ev.target.value);
	}

	handleCleared = () => {
		if (this.props.onChange) this.props.onChange(this.props.emptyValue);
	}

	handleIncomplete = ev => {
		if (this.props.onChange) this.props.onChange(ev.target.value);
	}

	render() {
		return (
			<Input>
				<div>
					<input ref={r => (this._input = r)}/>
				</div>
			</Input>
		);
	}
}
