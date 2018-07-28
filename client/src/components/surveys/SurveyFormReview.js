import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions/index';

const SurveyFormReview = (props) => {
		return(
			<div>
        <div><h3>SurveyFormReview</h3></div>
        <div>
        	<div>
        	<label>Survey Title</label>
        	<div>{props.formValues.title}</div>
        	</div>
        	<div>
        	<label>Survey Subject</label>
        	<div>{props.formValues.subject}</div>
        	</div>
        	<div>
        	<label>Survey Body</label>
        	<div>{props.formValues.body}</div>
        	</div>
        	<div>
        	<label>Survey Receipients</label>
        	<div>{props.formValues.recipients}</div>
        	</div>
        </div>
        <button className='yellow white-text darken-3 btn-flat' onClick={props.onCancel}>
          Back
        </button>
        <button className='green white-text btn-flat right' onClick={() => props.submitSurvey(props.formValues, props.history)}>
          Send Survey
          <i className='material-icons right'>email</i>
        </button>
		</div>
			);
	
}

const mapStateToProps = (state) => {
 return  {
  formValues: state.form.surveyForm.values
 };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));