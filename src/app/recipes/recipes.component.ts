import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;
  displayDetail: boolean = false;

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipeSelectedEvent.subscribe((recipeSelected: Recipe) => {
      this.recipe = recipeSelected;
      this.displayDetail = true;
    });
   }

  ngOnInit() {
  }

}
