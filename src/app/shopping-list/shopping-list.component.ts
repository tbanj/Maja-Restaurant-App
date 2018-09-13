import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

// import { Ingredient } from '../shared/ingredient.module';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;
  // declaring data to be recieved
  ingredients: Ingredient[];

  //   ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 10),
  //   new Ingredient('Banana', 5),
  //   new Ingredient('Tomato', 5),
  // ];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    // this is use to add and display new shopping-list to the array
    this.paramsSubscription = this.shoppingListService.
    ingredientUpdated.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );



  }
    // // addNewRecipe  nameNewRef
    // onIngredientAdded(ingredient: Ingredient ) {
    // // this is use to populate the preloaded data then display in the shopping-list compo
    // this.ingredients.push(ingredient);

    // // this is use to add new data then display in the shopping-list compo
    // this.shoppingListService.onIngredientAdd(ingredient);
    // }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
    ngOnDestroy() {
      this.paramsSubscription.unsubscribe();

    }
}
