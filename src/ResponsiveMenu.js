import React, {PropTypes, Component, Children} from 'react';
import MediaQuery from 'react-responsive';
import {Menu} from 'semantic-ui-react';
import TPropTypes from 'tproptypes';
import ResponsiveMenuItem from './ResponsiveMenuItem';
import ResponsiveMenuDropdown from './ResponsiveMenuDropdown';

export default function ResponsiveMenu({mobileWidth, children, ...rest}) {
	const minQuery = `(min-width: ${mobileWidth + 1}px)`;
	const maxQuery = `(max-width: ${mobileWidth}px)`;
	return (
		<div>
			<MediaQuery query={minQuery}>
				<Menu {...rest}>
					{children}
				</Menu>
			</MediaQuery>
			<MediaQuery query={maxQuery}>
				<Menu icon {...rest}>
					{Children.map(children, el => React.cloneElement(el, {
						isMobile: true,
					}))}
				</Menu>
			</MediaQuery>
		</div>
	);
}

ResponsiveMenu.propTypes = {
	children: TPropTypes.reactElements,
	mobileWidth: PropTypes.number,
};

ResponsiveMenu.defaultProps = {
	mobileWidth: 768,
};

ResponsiveMenu.Item = ResponsiveMenuItem;
ResponsiveMenu.Dropdown = ResponsiveMenuDropdown;
