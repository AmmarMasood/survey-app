import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys, deleteSurvey} from '../../actions/index';


class SurveyList extends Component{

	componentDidMount(){
		this.props.fetchSurveys();
	}

	deleteBtn = (id) => {
		this.props.deleteSurvey(id)
	}

	renderSurveys = () => {
		return this.props.surveys.reverse().map(survey => {
			return(
				<div className='card blue-grey lighten-1 white-text' key={survey._id}>
					<div className='card-content'>
					<span className='card-title'>{survey.title}</span>
					<p>{survey.body}</p>
					<p className='right'>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
					</div>
					<button className="waves-effect waves-light btn right red" onClick = {() => this.deleteBtn(survey._id)}>Delete</button>
					<div className='card-action'>
                    <a>Yes: {survey.yes}</a>
                    <a>No: {survey.no}</a>
					</div>
				</div>
				);
		})
	}                                      //^statement on Send on: gives us better looking date format
    render(){
		return(
       <div>
       	{this.renderSurveys()}
       </div>
			)
	}
}
const mapStateToProps = (state) => {
     return {surveys: state.surveys}
}
export default connect(mapStateToProps, {fetchSurveys, deleteSurvey})(SurveyList);