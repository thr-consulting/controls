import React from 'react';
import {Grid, Header, Form, Segment} from 'semantic-ui-react';
import {MaskedInput, RadioGroup, ResponsiveMenu} from './lib';

export default function App() {
	return (
		<Grid container>
			<Grid.Row>
				<Grid.Column>
					<Header as="h1">Controls Demo</Header>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<Segment>
						<Form>
							<Form.Field>
								<label>MaskedInput</label>
								<MaskedInput mask={{mask: '99-999-99', autoUnmask: true, showMaskOnHover: false}} fluid/>
							</Form.Field>
							<Form.Field>
								<label>RadioGroup</label>
								<RadioGroup grouped>
									<Form.Radio label="Option 1" value="1"/>
									<Form.Radio label="Option 2" value="2"/>
								</RadioGroup>
							</Form.Field>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column>
					<ResponsiveMenu vertical>
						<ResponsiveMenu.Item as="a" text="Home" icon="home"/>
						<ResponsiveMenu.Item text="Home" icon="home"/>
						<ResponsiveMenu.Item text="Home" icon="home"/>
						<ResponsiveMenu.Item text="Home" icon="home"/>
						<ResponsiveMenu.Dropdown text="More Home" icon="dollar">
							<ResponsiveMenu.Item text="Home" icon="home"/>
							<ResponsiveMenu.Item text="Home" icon="home"/>
						</ResponsiveMenu.Dropdown>
					</ResponsiveMenu>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}
