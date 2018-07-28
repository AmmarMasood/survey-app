//it show the form field so user can enter inputs.
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

class SurveyForm extends Component {

renderFields = () =>{
	return(
 <div>
 	<Field label ='Survey Title' type='text' name='title' component={SurveyField} />
 	<Field label ='Subject Line' type='text' name='subject' component={SurveyField} />
 	<Field label ='Email Body' type='text' name='body' component={SurveyField} />
 	<Field label ='Recepient List' type='text' name='recipients' component={SurveyField} /> 
 </div>
		);                                      
}

	render(){
		return(                               
			<div>
		      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> 
                 {this.renderFields()} 
              <Link to= '/surveys' className='red btn-flat left white-text'>Cancel</Link>
              <button type='submit' className='teal btn-flat right white-text'>
              Next
              <i className='material-icons right'>done</i>
              </button>

              </form>
            </div>
			);
	}
} 
const validate = (values) => {
	const errors = {};
errors.recipients = validateEmails(values.recipients || '');

if(!values.title){
 errors.title = "You must provide a title";
}
if(!values.subject){
 errors.subject = "You must provide a subject";
}
if(!values.body){
 errors.body = "You must provide a body";
}
if(!values.recipients){
 errors.recipients = "You must provide recepients";
}

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false  //this is true by default if you make it false, whenever user move to next page leaving
})(SurveyForm);        //the form behind they can still go back and check their input in forms