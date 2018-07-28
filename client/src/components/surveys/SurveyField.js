//the reason we made this is so that we do not have to make 4 different file inputs in our 
//surveyform component, rather we can just make one here then repeat it four in surveyform component
import React from 'react';

const SurveyField = ({input, label, meta}) => {  
	          //==props.input   
	return( 
  <div>
	  <label>{label}</label>     
      <input {...input} style={{marginBottom: '5px'}} /> 
      <div className = 'red-text' style={{marginBottom : '20px'}} >
      {meta.touched && meta.error}
      </div>
  </div>      
		);   
		}   
export default SurveyField;

//the {input} === props.input, props is comming from redux Field it just gives us all
 //of the properties of redux Field and props.input contains all
  // event handler we need you can console.log(props) to find more.
 //the {meta} === props.meta, this is another property that comes from Field it consist of all the error
//meta.erros are the erros you can console.log(meta) to find out more
  //{...input}  is just es5 version of writing all the properties of input like this
  //onBlur={input.onBlur} onChange={input.onChange} its like saying hey input we've 
  //got a big object with lots of props that we want to pass too just have the object and all
  //of its properties
