import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';
import { compareCourses, Course } from '../model/course';

/*
Al usar EntityState cada curso se guarda a manera de diccionario, facilitando la búsqueda
La clase incluye utilidades para poder respetar el orden de los cursos
*/
export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean
}

// La configuración permite agregar la función para comparar y ordernar 
// La propiedad selectId sirve para indicar el nombre de la key que tiene el id de la entity (acepta una fn)
export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});


export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(

    initialCoursesState,

    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.setAll(
            action.courses,
            //Permite indicar que se ha hecho el fetch para no quedarse en un estado de carga
            {...state,
                allCoursesLoaded: true
            })),

    on(CourseActions.courseUpdated, (state, action) =>
        adapter.updateOne(action.update, state) )
);

// El adaptador provee diferentes selectors útiles, aquí solo se usó selectAll
export const {
    selectAll
} = adapter.getSelectors();