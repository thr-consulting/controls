import React, { Component } from 'react';
import {MaskedInput, RadioGroup} from '../dist';
import {Grid, Header, Form, Segment} from 'semantic-ui-react';

class App extends Component {
  render() {
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
							    <MaskedInput mask={{mask: '99-999-99', autoUnmask: true, showMaskOnHover: false}}/>
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
	    </Grid>
    );
  }
}

export default App;
