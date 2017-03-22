import React, {Component, PropTypes} from 'react';
import $ from 'jquery';
import cn from 'classnames';
import TPropTypes from 'tproptypes';

/**
 * Displays a dropdown list in a Semantic UI menu
 * @class
 * @memberOf module:addons/controls
 * @property {string} title - The text of the menu item
 * @property {module:addons/TPropTypes~reactElements} children - Semantic UI menu children
 * @property {object} options - Custom Semantic UI options
 * @property {string} [options.on=hover] - How the menu dropdown is triggered
 * @property {string} className - Extra classes on the dropdown item
 * @property {string} icon - The Semantic UI icon to display, defaults to 'dropdown'
 */
export default class DropdownMenu extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		children: TPropTypes.reactElements,
		options: PropTypes.shape({
			on: PropTypes.string,
		}),
		className: PropTypes.string,
		icon: PropTypes.string,
	};

	static defaultProps = {
		options: {
			on: 'hover',
		},
		icon: 'dropdown',
	};

	componentDidMount() {
		this._menu = $(this._menuNode).dropdown(this.props.options);
	}

	componentWillUnmount() {
		this._menu.dropdown('destroy');
	}

	render() {
		return (
			<div className={cn('ui dropdown item', this.props.className)} ref={node => (this._menuNode = node)}>
				{this.props.title} <i className={cn(this.props.icon, 'icon')}/>
				<div className="menu">
					{this.props.children}
				</div>
			</div>
		);
	}
}
