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

