import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;
  displayDetail: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onRecipeClick(data: Recipe) {
    this.recipe = data;
    this.displayDetail = true;
  }

}
