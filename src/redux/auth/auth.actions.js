import AuthActionTypes from './auth.types';

export const LoginSuccess = (info) => ({
    type: AuthActionTypes.LoginSuccess,
    jwt: info.jwt,
    userId: info.userId
  })
  
  export const checkIfStudent = (_isStudent) => ({
    type: AuthActionTypes.checkIfStudent,
    isStudent: _isStudent
  })
  
  export const enterClass = (_classId) => ({
    type: AuthActionTypes.enterClass,
    classId: _classId
  })