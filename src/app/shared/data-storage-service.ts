import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn : 'root'})
export class DataStorageService{

    recipesPutUrl = 'https://http-backend-sample.firebaseio.com/recipes.json';
    recipesGetUrl = 'https://http-backend-sample.firebaseio.com/recipes.json';

    constructor(private httpClient: HttpClient, private recipeService: RecipeService){
    }

    onSaveData(){
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.httpClient.put(this.recipesPutUrl, recipes).subscribe(response => {
            console.log('Recipes have been saved.');
        });
    }

    onFetchData() {
        this.httpClient.get<Recipe[]>(this.recipesGetUrl).subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        });
    }
}
