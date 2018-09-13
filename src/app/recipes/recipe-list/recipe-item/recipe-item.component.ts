
import { Recipe } from '../../recipe.model';
import { Component, OnInit, Input} from '@angular/core';



@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: []
})
export class RecipeItemComponent implements OnInit {
    @Input() recipe: Recipe;
    @Input() index: number;
    // @Output() recipeSelected = new EventEmitter<string>();
  //   recipes: Recipe[] = [
//     new Recipe('A Test Recipe', 'This is simply a test', '/assets/images/foo.jpeg'),
//     new Recipe('A Test Recipe', 'This is simply a test', '/assets/images/foo.jpeg'),
//     new Recipe('A Test Recipe', 'This is simply a test', '/assets/images/foo.jpeg')
//   //   new Recipe('A Test Recipe', 'This is simply a test', 'http://foodpam.com/uploads/170907090159.jpg'),
//   //   new Recipe('A Test Recipe', 'This is simply a test', 'http://foodpam.com/uploads/170907090159.jpg'),
//   //   new Recipe('A Test Recipe', 'This is simply a test', 'http://foodpam.com/uploads/170907090159.jpg'),
//   //
// ];
  // constructor(private recipeService: RecipesService) {
  //   console.log(this.Recipe.) ;
  // }

    ngOnInit() {
    }

    // onSelected() {
    //   this. recipeService.recipeSelected.emit(this.recipe);
    //     // this.recipeSelected.emit();
    // }

}
