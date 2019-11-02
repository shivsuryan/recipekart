import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  displayDetail: boolean = false;
  recipeSelectedEventSubscriber: Subscriber<Recipe>;

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipeSelectedEvent.subscribe((recipeSelected: Recipe) => {
      this.recipe = recipeSelected;
      this.displayDetail = true;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.recipeSelectedEventSubscriber.unsubscribe();
  }

}
