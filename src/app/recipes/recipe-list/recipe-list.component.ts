import { ShoppingListService } from './../../services/shopping-list.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { debuglog } from 'util';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSubscription: Subscription;

    // @Output() recipeWasSelected = new EventEmitter<Recipe>() ;
    // @Input() index: number;
    recipes: Recipe[];

    // make use of private within the constructor
    // makes the variable accessible in any part of this component
    // and its root component
    constructor(private recipeService: RecipesService, private shoppingListService: ShoppingListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datastorage: DataStorageService
    ) {

    }
    ngOnInit() {
      // below will get a copy of recipes from the service







      this.recipeSubscription = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

      // // this will load data from firebase
      this.datastorage.getRecipes();


      // // this will load data from local storage
      this.recipes = this.recipeService.getRecipes();
      // console.log(this.recipes);
      alert('We have delicious order in stock, fresh and hot.');
    }

    // onRecipeSelected(recipe: Recipe) {
    //      this.recipeWasSelected.emit(recipe) ;
    //    // console.log(this.recipeWasSelected.emit(recipe));
    //    const index = this.recipes.findIndex(x => x === recipe) ;
    //    console.log('The indexOf Item click is' + ' ' + index);
    // }

    onNewRecipe() {
      this.shoppingListService.questDenied();
      this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    }

    ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
    }

}

