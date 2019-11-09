import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient,model';
import { Subject } from 'rxjs';

export class RecipeService {

    recipeSelectedEvent = new Subject<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'TestRecipe1',
            'Description 01',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s',
            1,
            [new Ingredient('Ingredient01', 1), new Ingredient('Ingredient02', 2)]
        ),
        new Recipe(
            'TestRecipe2',
            'Description 02',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s',
            2,
            [new Ingredient('Ingredient03', 3), new Ingredient('Ingredient04', 4)]
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
        recipe.id = this.recipes.length;
        this.recipes.push(recipe);
    }

    updateRecipe(recipe: Recipe): Recipe {
        return this.recipes.find((r) => {
            if (r.id === recipe.id) {
                r.name = recipe.name;
                r.imageUrl = recipe.imageUrl;
                r.description = recipe.description;
            }
        });
    }

    deleteRecipe(id: number) {
        this.recipes = this.recipes.slice(id, 1);
    }

}
