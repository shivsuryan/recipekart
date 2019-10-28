import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeClicked = new EventEmitter<Recipe>();

  onClick() {
    this.recipeClicked.emit(this.recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
