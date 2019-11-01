import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipe: Recipe;
  isEditMode = false;
  id: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((paramsIn: Params) => {
      const idIn: number = +paramsIn['id'];
      if (idIn != null) {
        this.isEditMode = true;
        this.recipe = this.recipeService.getRecipe(idIn);
      }
      console.log(this.isEditMode);
    });
  }

  updateOrSaveRecipe(){
    
  }

}
