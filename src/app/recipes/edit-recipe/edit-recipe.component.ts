import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
    const recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeId = recipe.id;
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
          }));
        }
      }
    }

    this.myForm = new FormGroup({
      // id: new FormControl(-1),
      name: new FormControl(recipeName, Validators.required),
      imageUrl: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onClear() {
    this.myForm.reset();
    this.router.navigate(['recipes']);
  }

  onAddOrEditRecipe() {
    // updating the existing recipe item
    if (this.isEditMode) {
      const recipe = new Recipe(this.myForm.value.name, this.myForm.value.description, this.myForm.value.imageUrl, this.id);
      this.recipeService.updateRecipe(recipe);
    } else {
      const recipe = new Recipe(this.myForm.value.name, this.myForm.value.description, this.myForm.value.imageUrl);
      this.recipeService.addRecipe(recipe);
    }
    this.myForm.reset();
    this.router.navigate(['recipes']);
  }

  getControls() {
    return (<FormArray>this.myForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.myForm.get('ingredients')).push(new FormGroup({
      name: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    }));
  }
}
