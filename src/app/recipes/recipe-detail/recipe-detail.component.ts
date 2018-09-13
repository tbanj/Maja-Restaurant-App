import { AuthService } from './../../auth/auth.service';
import { ShoppingListService } from './../../services/shopping-list.service';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
    paramsSubscription: Subscription;
    recipeDetailClick = true;
    am = 0;
    recipe: Recipe;
    id: number;
    loadedRecipeFeature = 'To Shopping List';

    constructor(private recipeService: RecipesService,
    private activatedRoute: ActivatedRoute, private authService: AuthService,
    private shoppingListService: ShoppingListService, private router: Router) { }

    ngOnInit() {
      // this will only fetch route id when we are loading for the 1st
      // time only
      // const id = this.activatedRoute.snapshot.params['id'];

      // this will fetch route id anytime
      this.paramsSubscription = this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          // + is use to conver the string return we get to number type
          this.id = +params['id'];
          console.log( this.id);
          this.recipe = this.recipeService.getRecipe(this.id);
          console.log( this.recipe);
        }
      );
    }

    // onNavigateManageRecipe(manageRecipeFeature: string) {
    //   this.loadedRecipeFeature = manageRecipeFeature ;
    // }

    onSelectManageRecipe() {
      // use to check if access should be granted to recipe to shoppinglist
      if (this.authService.token === undefined) {
        this.shoppingListService.questDenied();
      } else if (this.authService.token !== undefined)  {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      }
    }


    onSelectEditRecipe() {
      this.shoppingListService.questDenied();
      // this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
              // or
      this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
    }

    // a good practice incase when you create your own observable to
    // always clean up
    ngOnDestroy() {
     this.paramsSubscription.unsubscribe();
    }

    onDeleteRecipe() {
     // use to check if access should be granted to delete recipe
      if (this.authService.token === undefined) {
        this.shoppingListService.questDenied();
      } else if (this.authService.token !== undefined)  {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
      }
    }
}
