import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient,model';
import { ShoppingListService } from './shopping-list.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  updateShoppingListEventSubscriber: Subscriber<Ingredient>;

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.updateShoppingListEvent.subscribe((ingredientsUpdate: Ingredient[]) => {
      this.onSLUpdateEvent(ingredientsUpdate);
    });
  }

  onSLUpdateEvent(ingredientsUpdate: Ingredient[]) {
    this.ingredients = ingredientsUpdate;
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy() {
    this.updateShoppingListEventSubscriber.unsubscribe();
  }
}
