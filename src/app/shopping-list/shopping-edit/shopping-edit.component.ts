import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: []
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  // clean up subscription
  startedEditingSubscription: Subscription;

  // @ViewChild('nameInput') nameTest: ElementRef;
  // @ViewChild('amountInput') amountTest: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) {


  }

  ngOnInit() {
    this.startedEditingSubscription = this.shoppingListService
    .startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameTest.nativeElement.value;
    // const ingAmount = this.amountTest.nativeElement.value;
    // console.log(this.nameTest.nativeElement.value);
    // console.log(this.amountTest.nativeElement.value);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
        this.shoppingListService.
        updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.ingredientAdded.emit(newIngredient);
    this.shoppingListService.onIngredientAdd(newIngredient);
    }

    this.editMode = false;
    // this is use to reset the form
    form.reset();

  }

    onClear() {
      this.slForm.reset();
      this.editMode = false;
    }

    onDelete() {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }

    // to clean up the memory of startedEditing
  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
    this.onClear();
  }
}
