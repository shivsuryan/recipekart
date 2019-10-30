import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient,model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Input() name = '';
  @Input() amount = 0;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd() {
    if (this.name !== '' && this.amount !== 0) {
      this.shoppingListService.addIngredient(new Ingredient(this.name, this.amount));
    }
  }

}
