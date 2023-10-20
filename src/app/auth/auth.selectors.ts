import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';


/*
Los selector permiten obtener una parte del estado en lugar de todo
*/

//Se usa un feature selector para acceder solo al estado relacionado a la feature de auth
export const selectAuthState =
    createFeatureSelector<AuthState>("auth");


export const isLoggedIn = createSelector(
    selectAuthState,
    auth =>  !!auth.user

);


export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);