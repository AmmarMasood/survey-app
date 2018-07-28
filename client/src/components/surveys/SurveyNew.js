import React,{ Component } from 'react';
import SurveyForm from './SurveyForm.js';
import SurveyFormReview from './SurveyFormReview.js';
import {reduxForm} from 'redux-form';


class SurveyNew extends Component{
// constuctor(props){
// 	super(props);
// 	this.state = {
// 		showFormReview: false
// 	}
// }

state = {
 showFormReview: false
 }//this and above statement are same this is just create-react-app advantage.

 renderContent = () => {
 if(this.state.showFormReview){

     return <SurveyFormReview 
         onCancel = {() => this.setState({showFormReview: false})}
      />
 } 
     return <SurveyForm
         onSurveySubmit={() => this.setState({showFormReview: true})}
          />
 }

  render(){
	  return(
			<div>
			{this.renderContent()}
            </div>
			);
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);