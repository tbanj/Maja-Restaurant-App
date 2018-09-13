import { Ingredient } from '../shared/ingredient.model';
import { Output } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 10),
        new Ingredient('Banana', 5),
        new Ingredient('Tomato', 5),
      ];
      @Output() ingredientUpdated = new Subject<Ingredient[]>();
      // Is use to access this module from outside
      getIngredients() {
          // this use to make a copy of the  ingredients
          return this.ingredients.slice();

        // return this.ingredients;
      }

      getIngredient(index: number) {
          return this.ingredients[index];
      }

    onIngredientAdd(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientUpdated.next(this.ingredients.slice());
    }

    onIngredientsAdded(ingredients: Ingredient[]) {
        // easy way to get access to all the ingredients
        // looping through all the ingredients
        // ingredients.forEach(ingredient => {
        //     this.onIngredientAdd(ingredient);
        // });

        // 2nd way to access all the ingredients
        // using es6 spread operattor (...) let us turn array of elements
        // into list of elements
        this.ingredients.push(...ingredients) ;
        this.ingredientUpdated.next(this.ingredients.slice()) ;
    }

    updateIngredient(index: number, newIngrdient: Ingredient) {
        this.ingredients[index] =  newIngrdient;
        this.ingredientUpdated.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientUpdated.next(this.ingredients.slice());
    }

    questDenied() {
        alert('only registered user can access this features');
    }
}
