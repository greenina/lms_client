import { createSelector } from 'reselect';

const selectAuth = state => state.authList;

export const selectToken = createSelector(
  [selectAuth],
  authList => authList.jwt
);

export const selectIsStudent = createSelector(
  [selectAuth],
  authList => authList.isStudent
);

export const selectUserId = createSelector(
  [selectAuth],
  authList => authList.userId
);

export const selectClassId = createSelector(
  [selectAuth],
  authList => authList.class.classId
);

export const selectClassStudents = createSelector(
  [selectAuth],
  authList => authList.class.students
);

export const selectClassName = createSelector(
  [selectAuth],
  authList => authList.class.className
);