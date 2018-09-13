import { Subject } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../recipes/recipe.model';
import { Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';


@Injectable()
export class RecipesService {
    // recipeSelected = new EventEmitter<Recipe>();
     recipesChanged = new Subject<Recipe[]>();

     // http://www.konbini.com/ng/files/2017/07/img_6601-2.jpg
     // https://img.taste.com.au/O1ofwjUO/w1200-h630-cfill/taste/2016/11/spaghetti-with-meatballs-and-spicy-tomato-sauce-102298-1.jpeg
    //  '/assets/images/foo.jpeg'
    // 'C:/Users/Engr Wahab/Angular_Project/Shopping-App/src/assets/images/foo.jpeg'
    // using private will make the recipes not to be
    // changeable outside this class
    // https://cdn.thenigerianvoice.com/images/content/1119201725710_maxresdefault_1.jpg
    // https://www.femininelounge.com/sites/default/files/images/blog/amala_gbegiri_0.png
    private recipes: Recipe[] = [
      new Recipe('Amala',
      // tslint:disable-next-line:max-line-length
      'Amala is a food common with the Yoruba tribe of western Nigerian. It is made from Yam flour and can be served with any soup ranging from Ewedu, Gbegiri, Vegetables,Egusi, Ogbono, Imoyo, Okra etc. Enjoy the yummy looking pictures below.',
       'https://res.cloudinary.com/dr9bbyvab/image/upload/v1536751076/maja-recipe/Amala-and-Egusi.jpg',
     [
       new Ingredient('Amala', 2),
       new Ingredient('Meet', 10)
     ]),
        new Recipe('Spaghetti and Meatballs',
         // tslint:disable-next-line:max-line-length
         'Spaghetti and Meatballs is an Italian – American dish which typically consists of Mincemeat, Tomato Sauce and Spaghetti. Spaghetti and Meatballs is absolutely delicious and very easy to whip up. ',
         'https://res.cloudinary.com/dr9bbyvab/image/upload/v1536751134/maja-recipe/spaghetti.jpg',
          [
          new Ingredient('meat', 2),
          new Ingredient('Spaghetti', 10)
        ]),
        new Recipe('Nigerian Jollof Rice',
         // tslint:disable-next-line:max-line-length
         'Nigerian Jollof Rice is a favorite Nigerian Rice recipe both for family dinners and at parties. You too can prepare this popular rice recipe.',
         'https://res.cloudinary.com/dr9bbyvab/image/upload/v1536763382/maja-recipe-jpeg2000/jollof.jp2',
        [
          new Ingredient('Fish', 2),
          new Ingredient('Yam', 10)
        ])
      //   new Recipe('A Test Recipe', 'This is simply a test', 'http://foodpam.com/uploads/170907090159.jpg'),
    //   //   new Recipe('A Test Recipe', 'This is simply a test', 'http://foodpam.com/uploads/170907090159.jpg'),
    //   //   new Recipe('A Test Recipe', 'This is simply a test', 'http://foodpam.com/uploads/170907090159.jpg'),
    //   //
         ];



         constructor( private shoppingListService: ShoppingListService) {

         }

         setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
            this.recipesChanged.next(this.recipes.slice());

         }

           // Is use to access this module from outside
         getRecipes() {
             // this.recipes.slice() will make it possible
             //  to get copy of the array whenever getRecipes is called
            //  this.setRecipes(this.recipes);
             return this.recipes.slice();
         }

         // this will pick the index of each recipes+
         getRecipe(index: number) {

           // console.log(this.recipes[index].ingredients);
            return this.recipes[index];
         }

         addIngredientsToShoppingList(ingredients: Ingredient[]) {
          this.shoppingListService.onIngredientsAdded(ingredients);
         }

         addRecipe(recipe: Recipe) {
            this.recipes.push(recipe);
            this.recipesChanged.next(this.recipes.slice());
         }

         updateRecipe(index: number, newRecipe: Recipe) {
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());
         }

         deleteRecipe(index: number) {
            this.recipes.splice(index, 1);
            this.recipesChanged.next(this.recipes.slice());
         }
}
