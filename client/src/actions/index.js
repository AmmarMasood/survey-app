import axios from 'axios';
import {FETCH_USER} from './type.js';
 
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