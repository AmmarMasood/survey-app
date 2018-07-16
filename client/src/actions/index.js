import axios from 'axios';
import {FETCH_USER} from './type.js';
 
 export const fetchUser = () => {
 	return async (dispatch) => {

       const res =  await axios.get('/api/current_user').catch(error => console.log(error.response));
       dispatch({type: FETCH_USER, payload: res.data})
      
      }
 };
 //both are same above is just refactored to async await syntax
 // 	return (dispatch) => {
 //       axios
//        .get('/api/current_user')
 //       .then(res => dispatch({type: FETCH_USER, payload: res}))
   //     .catch(error => console.log(error.response));
     // }
 export const handleToken = (token) => {
 return async (dispatch) => {
         const res = await axios.post('/api/stripe', token)
         dispatch({type: FETCH_USER, payload: res.data})            
}
};