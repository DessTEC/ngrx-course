import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action-types';

/* 
Los efectos son eventos adicionales al aplicar una acción y usar el reducer, usualmente son llamadas al back
SU estructura es como un servicio
*/

@Injectable()
export class AuthEffects {

    login$ = createEffect(() =>
        this.actions$
            .pipe(
                //ofType es parte de las API de ngrx, facilitan el indicar qué acción provoca el effect
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user',
                        JSON.stringify(action.user))
                )
            )
    ,
    // Se usa dispatch false para indicar que este efecto no provoca el llamado de una acción y evitar loops infinitos
    // En este caso tap sigue devolviendo un login action, entonces se crea un loop
    {dispatch: false});

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/login');
                })
            )
    , {dispatch: false});


    constructor(private actions$: Actions,
                private router: Router) {

    }

}