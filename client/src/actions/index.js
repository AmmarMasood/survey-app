import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, DELETE_SURVEYS} from './type.js';
 
 export const fetchUser = () => {
 	return async (dispatch) => {

       const res =  await axios.get('/api/current_user').catch(error => console.log(error.response));
       dispatch({type: FETCH_USER, payload: res.data})
      
      }
 };
 export const handleToken = (token) => {
 return async (dispatch) => {
         const res = await axios.post('/api/stripe', token)
         dispatch({type: FETCH_USER, payload: res.data})            
}
};
export const submitSurvey = (values, history) => {
 return async (dispatch) => {
 	const res = await axios.post('/api/surveys', values)
 	history.push('/surveys'); //so user can go to /survey routes once done
    dispatch({type: FETCH_USER, payload: res.data})
}
};
export const fetchSurveys = () => {
	return async (dispatch) => {
		const res = await axios.get('/api/surveys');
		dispatch({type: FETCH_SURVEYS, payload: res.data});

	}
}
export const deleteSurvey = (id) => {
 return async (dispatch) => {
	const res = await axios.post('/api/survey/delete', {id});
	dispatch({type: DELETE_SURVEYS, payload: res.data._id});
 }
}