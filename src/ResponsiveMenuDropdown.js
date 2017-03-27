import React, {PropTypes, Children} from 'react';
import {Dropdown} from 'semantic-ui-react';

export default function ResponsiveMenuDropdown({children, isMobile, icon, text, ...rest}) {
	return (
		<Dropdown item text={text} icon={isMobile ? icon : 'dropdown'}>
			<Dropdown.Menu>
				{Children.map(children, el => React.cloneElement(el, {
					MenuComponent: Dropdown.Item,
				}))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

ResponsiveMenuDropdown.propTypes = {
	isMobile: PropTypes.bool,
};

ResponsiveMenuDropdown.defaultProps = {
	isMobile: false,
};

