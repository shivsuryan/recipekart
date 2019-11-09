import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient,model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode = false;
  editIngrdient: Ingredient;
  editIngrdientIndex: number;
  startEditingItemEventSubscription: Subscription;
  @ViewChild('f', { static: false }) slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.startEditingItemEventSubscription = this.shoppingListService.startEditingItemEvent.subscribe((index: number) => {
      this.editMode = true;
      this.editIngrdientIndex = index;
      this.editIngrdient = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editIngrdient.name,
        amount: this.editIngrdient.amount
      });
    });
  }

  onAddItem(form: NgForm) {
    console.log(form);
    const value = form.value;
    if (this.editMode) {
      const ingredient = new Ingredient(value.name, value.amount);
      ingredient.id = this.editIngrdientIndex;
      this.shoppingListService.updateIngredient(ingredient);
      this.editMode = false;
      form.reset();
    } else {
      this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    }
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.startEditingItemEventSubscription.unsubscribe();
  }

}
