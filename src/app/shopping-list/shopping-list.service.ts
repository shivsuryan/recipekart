import { Ingredient } from '../shared/ingredient,model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

    updateShoppingListEvent = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('apple', 5),
        new Ingredient('tomatoes', 5),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.updateShoppingListEvent.emit(this.ingredients.slice());
    }
}
