import {MaskedInput} from '../lib';
import RadioGroup from "../src/RadioGroup";
import {Form} from 'semantic-ui-react';

ReactDOM.render((
	<div className="ui container grid">
		<div className="sixteen wide column">
			<h1 className="ui header">
				Controls Demo
			</h1>
		</div>
		<div className="sixteen wide column">
			<div className="ui segment form">
				<div className="field">
					<label>MaskedInput</label>
					<MaskedInput mask={{mask: '99-999-99', autoUnmask: true, showMaskOnHover: false}}/>
				</div>
				<div className="field">
					<label>RadioGroup</label>
					<RadioGroup grouped>
						<Form.Radio label="Option 1" value="1"/>
						<Form.Radio label="Option 2" value="2"/>
					</RadioGroup>
				</div>
			</div>
		</div>
	</div>
), document.getElementById('root'));
