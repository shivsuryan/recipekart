import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipe: Recipe;
  @Output() recipeClickEvent = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('TestRecipe1', 'TestRecipe1', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s'),
    new Recipe('TestRecipe2', 'TestRecipe2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeClick(data: Recipe){
    this.recipeClickEvent.emit(data);
  }
}
