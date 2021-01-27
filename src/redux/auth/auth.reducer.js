import AuthActionTypes from './auth.types';

const INITIAL_STATE = {
    jwt: 'init',
    isStudent:true,
    userId:''
};

const authReducer = (state = INITIAL_STATE, action) => {
    if(state === undefined)
    state = INITIAL_STATE;

  switch(action.type){
    case 'LoginSuccess':
      return {...state, jwt: action.jwt, userId: action.userId};
    case 'checkIfStudent':
      return{...state,isStudent:action.isStudent}
    
    default:
      return state;
  }
};

export default authReducer;