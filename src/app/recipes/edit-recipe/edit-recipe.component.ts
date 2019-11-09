import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: number;
  myForm: FormGroup;
  isEditMode = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((paramsIn: Params) => {
      const idIn: number = +paramsIn.id;
      if (idIn != null && !Number.isNaN(idIn)) {
        this.id = idIn;
        this.isEditMode = true;
        this.initForm();
      } else {
        this.initForm();
      }
    });
  }

  private initForm() {
    let recipeId = -1;
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeId = recipe.id;
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;
    }

    this.myForm = new FormGroup({
      // id: new FormControl(-1),
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required)
    });
  }

  onClear() {
    this.myForm.reset();
  }

  onAddOrEditRecipe() {
    // updating the existing recipe item
    if (this.isEditMode) {
      const recipe = new Recipe(this.myForm.value.name, this.myForm.value.imageUrl, this.myForm.value.description, this.id);
      this.recipeService.updateRecipe(recipe);
    } else {
      const recipe = new Recipe(this.myForm.value.name, this.myForm.value.imageUrl, this.myForm.value.description);
      this.recipeService.addRecipe(recipe);
    }
  }

}
