// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from 'semantic-ui-react';

export default function ResponsiveMenuItem({text, icon, ...rest}:
	{text?: string, icon?: string}) {
	return (
		<Menu.Item {...rest}>
			<Icon name={icon}/>
			{text}
		</Menu.Item>
	);
}

ResponsiveMenuItem.propTypes = {
	isMobile: PropTypes.bool,
	text: PropTypes.string,
	icon: PropTypes.string,
};

ResponsiveMenuItem.defaultProps = {
	isMobile: false,
};
