import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient,model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    console.log(form);
    const value = form.value;
    this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    form.reset();
  }

}
