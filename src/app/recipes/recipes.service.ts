import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {

    recipeSelectedEvent = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('TestRecipe1', 'TestRecipe1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s'),
        new Recipe('TestRecipe2', 'TestRecipe2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s')
      ];

      // returning a copy of array object
      getRecipes() {
          return this.recipes.slice();
      }
}