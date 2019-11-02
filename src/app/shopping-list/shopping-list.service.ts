import { Ingredient } from '../shared/ingredient,model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    updateShoppingListEvent = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [];

    // private ingredients: Ingredient[] = [
    //     new Ingredient('apple', 5),
    //     new Ingredient('tomatoes', 5),
    // ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.updateShoppingListEvent.next(this.ingredients.slice());
    }

    addIngredients(ingredientsUp: Ingredient[]) {
        this.ingredients = this.ingredients.concat(ingredientsUp);
        this.updateShoppingListEvent.next(this.ingredients.slice());
    }
}
