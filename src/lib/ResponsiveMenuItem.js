// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from 'semantic-ui-react';
import type {Component} from 'react-flow-types';

export default function ResponsiveMenuItem({text, icon, menuComponent, ...rest}:
	{text?: string, icon?: string, menuComponent: Component<*>}) {
	const MenuComponent = menuComponent || Menu.Item;
	return (
		<MenuComponent {...rest}>
			<Icon name={icon}/>
			{text}
		</MenuComponent>
	);
}

ResponsiveMenuItem.propTypes = {
	text: PropTypes.string,
	icon: PropTypes.string,
	menuComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
