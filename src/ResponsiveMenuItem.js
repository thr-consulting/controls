import React, {PropTypes} from 'react';
import {Menu, Icon} from 'semantic-ui-react';

export default function ResponsiveMenuItem({text, icon, isMobile, MenuComponent, ...rest}) {
	return (
		<MenuComponent {...rest}>
			<Icon name={icon}/>
			{text}
		</MenuComponent>
	);
}

ResponsiveMenuItem.propTypes = {
	isMobile: PropTypes.bool,
	MenuComponent: PropTypes.any,
};

ResponsiveMenuItem.defaultProps = {
	isMobile: false,
	MenuComponent: Menu.Item,
};
