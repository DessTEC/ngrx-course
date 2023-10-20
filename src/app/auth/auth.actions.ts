import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

/* 
Las acciones solo son indicaciones de eventos que suceden en la aplicación
Las acciones usualemnte tienen el formato de [Lugar de origen del dispatch] Descripción de action
Los props son opcionales, son los argumentos mandados junto con el dispatch de la acción
*/

export const login = createAction(
    "[Login Page] User Login",
    props<{user: User}>()
);

export const logout = createAction(
    "[Top Menu] Logout"
);