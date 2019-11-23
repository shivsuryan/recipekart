import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    user: User = null;

    recipesPutUrl = 'https://http-backend-sample.firebaseio.com/recipes.json';
    recipesGetUrl = 'https://http-backend-sample.firebaseio.com/recipes.json';

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
        this.authService.user.pipe(take(1)).subscribe(user => {
            this.user = user;
        });
    }

    onSaveData() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.httpClient.put(this.recipesPutUrl, recipes).subscribe(response => {
            console.log('Recipes have been saved.');
        });
    }

    onFetchData() {
        console.log(this.authService.userIn);
        this.httpClient.get<Recipe[]>(this.recipesGetUrl,
            {
                params: new HttpParams().set('auth', this.authService.userIn.token)
            }).subscribe(recipes => {
                console.log('Recipe data fetched.');
                this.recipeService.setRecipes(recipes);
            }, error => {
                console.log(error);
            });
    }
}
