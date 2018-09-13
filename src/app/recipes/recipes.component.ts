import { Component, OnInit, Input, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // @Input() selectedRecipe: Recipe;
  constructor() { }

  ngOnInit() {
    // this.paramsSubscription = this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );

  }


}
