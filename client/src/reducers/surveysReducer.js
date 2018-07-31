import {FETCH_SURVEYS, DELETE_SURVEYS} from '../actions/type';

export default (state=[], action) => {
	switch(action.type){
		case FETCH_SURVEYS:
		return action.payload;
		case DELETE_SURVEYS:
		const survey = state.filter(function (state){
			return state._id !== action.payload
		}).reverse()
		return survey;
		default: 
		return state;
	}
}
