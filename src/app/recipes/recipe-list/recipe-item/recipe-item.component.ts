import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { EventEmitter } from '@angular/core';
import { RecipeService } from '../../recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  onClick() {
    // //this.recipeService.recipeSelectedEvent.emit(this.recipe);
    // this.router.navigate(['/recipes', this.recipe.id]);
  }

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
  }

}
