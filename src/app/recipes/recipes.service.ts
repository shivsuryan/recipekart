import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient,model';
import { Subject } from 'rxjs';

export class RecipeService {

    recipeSelectedEvent = new Subject<Recipe>();
    recipeListUpdatedEvent = new Subject<boolean>();

    private recipes: Recipe[] = [
        new Recipe(
            'BreadwithEgg',
            'Healthy brown bread and super food egg.',
            'https://cdn.pixabay.com/photo/2014/09/15/16/53/tomatoes-447170_960_720.jpg',
            1,
            [new Ingredient('Brown Bread', 1), new Ingredient('Egg Boiled', 1), new Ingredient('Cheese', 1), new Ingredient('Spinach', 2)]
        ),
        new Recipe(
            'Pasta with Green Sauce',
            'Sumptous pasta with spicy green sauce.',
            'https://cdn.pixabay.com/photo/2016/11/23/18/31/close-up-1854245_960_720.jpg',
            2,
            [new Ingredient('Pasta', 25), new Ingredient('Green Sauce', 2)]
        )
    ];

    getRecipes() {
        // returning a copy of array object
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index - 1];
    }

    addRecipe(recipe: Recipe) {
        recipe.id = this.recipes.length + 1;
        this.recipes.push(recipe);
        this.recipeListUpdatedEvent.next(true);
    }

    updateRecipe(recipe: Recipe): Recipe {
        return this.recipes.find((r) => {
            if (r.id === recipe.id) {
                r.name = recipe.name;
                r.imageUrl = recipe.imageUrl;
                r.description = recipe.description;
                r.ingredients = recipe.ingredients;
            }
        });
    }

    deleteRecipe(id: number) {
        this.recipes = this.recipes.splice(id, 1);
        this.recipeListUpdatedEvent.next(true);
    }

}
