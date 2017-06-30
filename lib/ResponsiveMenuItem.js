// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from 'semantic-ui-react';

export default function ResponsiveMenuItem({text, icon, isMobile, MenuComponent, ...rest}:
	{text?: string, icon?: string, isMobile: boolean, MenuComponent: any}) {
	return (
		<MenuComponent {...rest}>
			<Icon name={icon}/>
			{text}
		</MenuComponent>
	);
}

ResponsiveMenuItem.propTypes = {
	isMobile: PropTypes.bool,
	MenuComponent: PropTypes.element,
	text: PropTypes.string,
	icon: PropTypes.string,
};

ResponsiveMenuItem.defaultProps = {
	isMobile: false,
	MenuComponent: Menu.Item,
};
