import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../services/recipes.service';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';

// we make use at Injectable below cos we want to recieve some
// datas from other services
@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipesService
    , private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        const header = new Headers({'Content-Type': 'application.json'});

       return this.http.put('https://ng-recipe-maja-36cda.firebaseio.com/recipes.json?auth=' + token,
        this.recipeService.getRecipes()
        , {headers: header}
    );
    }


    getRecipes() {
        // is use get token sent from firebase
        // const token = this.authService.getToken();

        // if (token != null ) {
        //     this.http.get('https://ng-recipe-maja-36cda.firebaseio.com/recipes.json?auth=' + token)
        // .pipe(map((response: Response) => {
        //     const recipes: Recipe[] = response.json();
        //     for (const recipe of recipes) {
        //         if (!recipe['ingredients']) {

        //             recipe['ingredients'] = [];
        //             console.log(recipe);
        //         }
        //     }
        //     return recipes;
        //  }))
        // .subscribe(
        //     (recipes: Recipe[]) => {
        //         this.recipeService.setRecipes(recipes);
        // } );
        // }


            this.http.get('https://ng-recipe-maja-36cda.firebaseio.com/recipes.json')
        .pipe(map((response: Response) => {
            const recipes: Recipe[] = response.json();
            for (const recipe of recipes) {
                if (!recipe['ingredients']) {

                    recipe['ingredients'] = [];
                    // console.log(recipe);
                }
            }
            return recipes;
         }))
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
                // console.log(this.recipeService.setRecipes(recipes));
        } );


     }


    // private handleError<T> (operation = 'operation', result?: T) {

    // {
    //     return (error: any): Observable<T> => {
    //       // TODO: send the error to remote logging infrastructure
    //     //   console.error(error);
    //       // log to console instead
    //       // TODO: better job of transforming error for user consumption
    //     //    this.log(`${operation} failed: ${error.message}`);
    //         this.log(`${operation} failed: `);
    //       // Let the app keep running by returning an empty result.
    //       return of(result as T);
    //     };

    // }
    //    /** Log a HeroService message with the MessageService */

    // }

    // private log(message: string) {
    //     console.log(message);
    //     // this.messageService.add(`ServerService: ${message}`);
    //   }
}



