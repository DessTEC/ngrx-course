import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { AppState } from '../reducers';
import { loadAllCourses } from './course.actions';
import { areCoursesLoaded } from './courses.selectors';


@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                // No se hará la request al back si los cursos ya han sido cargados
                select(areCoursesLoaded),
                tap(coursesLoaded => {
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                // Filter previene usar valores no deseados como router snapshot data, porque el boolean emite valores antes del fetch
                // Se acaba el observable hasta que coursesLoaded es true, es decir, hasta que se haya hecho el fetch
                filter(coursesLoaded => coursesLoaded),
                first(),
                finalize(() => this.loading = false)
            );

    }

}