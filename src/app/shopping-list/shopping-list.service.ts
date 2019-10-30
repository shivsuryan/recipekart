import { Ingredient } from '../shared/ingredient,model';

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('apple', 5),
        new Ingredient('tomatoes', 5),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }
}
