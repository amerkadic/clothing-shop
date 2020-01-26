import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = state => createSelector(
    [selectUser],
    (user) => user.currentUser
);