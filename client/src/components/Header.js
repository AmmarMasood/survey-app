import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Loading from './Loading';
import Payment from './Payments';



class Header extends Component {

renderContent = () => {
	switch(this.props.auth){
      case null:     //the current state
          return <li><Loading /></li>;
       case false:     //if user is not loggedin
           return <li><a className="waves-effect waves-light btn red lighten-2" href= "/auth/google">Sign in with Google</a></li>;
      default:         //if use is loggedin
	       return [
	       <li key="1"><Payment /></li>,
	       <li key="3"  style={{ margin:'0 10px' }}>Credits: {this.props.auth.credits}</li>,
	       <li key="2"><a href ="/api/logout">Logout</a></li>
	       ]
	}
}

render(){

var fontStyle = {
	fontSize: "1.6em",
	paddingLeft: "0.5em",
	fontFamily: 'Wendy One'
}

return(
   <nav className="purple lighten-2">
    <div className="nav-wrapper">
      <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">
       <div style={fontStyle}>Emaily</div>
      </Link>
      <ul className="right waves-effect waves-light" id="mobile-demo">
        {this.renderContent()}
      </ul>
    </div>
  </nav>
			);
	}
}
const mapStateToProps = (state) => {
 return {
 	auth: state.auth
 };
}
export default connect(mapStateToProps)(Header);
