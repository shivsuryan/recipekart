import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  displayDetail: boolean = false;
  recipeSelectedEventSubscriber: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeSelectedEventSubscriber = this.recipeService.recipeSelectedEvent.subscribe((recipeSelected: Recipe) => {
      this.recipe = recipeSelected;
      this.displayDetail = true;
    });
  }

  ngOnDestroy() {
    this.recipeSelectedEventSubscriber.unsubscribe();
  }

}
