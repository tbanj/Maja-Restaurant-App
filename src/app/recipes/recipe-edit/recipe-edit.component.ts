
import { RecipesService } from '../../services/recipes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
  private recipeService: RecipesService,
private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params
    .subscribe( (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });



  }



  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;




      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          // console.log(this.recipeForm.get('ingredient.name') as FormArray);
          recipeIngredients.push(
            this.fb.group({
              name: this.fb.control(ingredient.name, Validators.required),
              amount: this.fb.control(ingredient.amount,
                [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required]),
            })
          );
          console.log(ingredient.name);

      }
    }


  }

    this.recipeForm = this.fb.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients,
  });


  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;

  }



  onSubmit() {



    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      // *ngIf="ingredients.controls"
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);

    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      // console.log('hello ' + newRecipe);
    }
    console.log(this.recipeForm);
    // this.recipeForm.reset();

    this.onCancel();
  }

  onAddIngredient() {
    // this is use to push this new data to existing one of ingredients array
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel () {
    // this.activatedRoute is the current route url which will be return
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
    // a good practice incase when you create your own observable to
    // always clean up
  ngOnDestroy() {
    this.paramsSubscription .unsubscribe();
  }

  onDeleteIngredients(index: number) {
    this.ingredients.removeAt(index);
  }

}


// for full image path
// /../../../../../assets/images/foo.jpeg
//  C:/Users/Engr Wahab/Pictures/ff/number_one.PNG
// /../../../../../ff/number_one.PNG



