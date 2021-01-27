import AuthActionTypes from './auth.types';

const INITIAL_STATE = {
    jwt: 'init',
    isStudent:true,
    userId:'',
    class: {
      classId: '',
      className: '',
      lectureDates: '',
      notices:'',
      lectureContents:'',
      assignments: ''
    }
};

const authReducer = (state = INITIAL_STATE, action) => {
    if(state === undefined)
    state = INITIAL_STATE;

  switch(action.type){
    case 'LoginSuccess':
      return {...state, jwt: action.jwt, userId: action.userId};
    case 'checkIfStudent':
      return{...state,isStudent:action.isStudent}
    case 'enterClass':
      var _class = { ...(state.class), classId: action.classId };
      return { ...state, class: _class }
    default:
      return state;
  }
};

export default authReducer;