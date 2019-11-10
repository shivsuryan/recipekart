import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipes: Recipe[];
  recipeUpdatedEventSubscriber: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeUpdatedEventSubscriber = this.recipeService.recipeListUpdatedEvent.subscribe((value: boolean) => {
      if (value) {
        this.recipes = this.recipeService.getRecipes();
      }
    });
  }

  ngOnDestroy(){
    this.recipeUpdatedEventSubscriber.unsubscribe();
  }

}
