import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  id: number;

  constructor(
    private sLService: ShoppingListService,
    private activedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.activedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  addIngToSL() {
    this.sLService.addIngredients(this.recipe.ingredients);
  }
  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activedRoute });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
