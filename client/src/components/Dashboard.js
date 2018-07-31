import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import Loading from './Loading.js';
import {connect} from 'react-redux';

class Dashboard extends Component{
	render(){
		if(this.props.auth){
			return(
					<div>
						<h3 style={{fontFamily:'Palanquin Dark'}}>List of Surveys:</h3>
							<SurveyList />
						<div className="fixed-action-btn">
							<Link to='/surveys/new' className="btn-floating btn-large red">
							<i className="material-icons">add</i>	
						    </Link>
						</div>
					</div>
				)} 
		return <div className="progress">
	         	<div className="indeterminate"></div>
		      </div>
}
}

const mapStateToProps = (state) => {
	return {auth: state.auth}
}
export default connect(mapStateToProps)(Dashboard);