import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient,model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  updateShoppingListEventSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{
    shoppingList: {
      ingredients: Ingredient[]
    }
  }>) {
    this.ingredients = this.store.select('shoppingList');
    // tslint:disable-next-line: max-line-length
    // this.updateShoppingListEventSubscription = this.shoppingListService.updateShoppingListEvent.subscribe((ingredientsUpdate: Ingredient[]) => {
    //   this.onSLUpdateEvent(ingredientsUpdate);
    // });
  }

  onStartEditing(index: number) {
    this.shoppingListService.startEditingItemEvent.next(index);
  }

  onSLUpdateEvent(ingredientsUpdate: Ingredient[]) {
    //this.ingredients = ingredientsUpdate;
  }

  ngOnInit() {
    //this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy() {
    //this.updateShoppingListEventSubscription.unsubscribe();
  }
}
