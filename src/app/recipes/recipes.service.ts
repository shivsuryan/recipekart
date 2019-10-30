import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient,model';

export class RecipeService {

    recipeSelectedEvent = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'TestRecipe1',
            'Description 01',
            //'Bacon ipsum dolor amet capicola tail meatloaf, ground round pancetta andouille shankle pork loin bacon chicken tri-tip tongue. Filet mignon chicken venison bacon, turkey bresaola kielbasa. Biltong brisket fatback venison tongue chuck pancetta picanha porchetta. Ground round bresaola tri-tip filet mignon pork pig short loin venison. Pork loin strip steak short loin drumstick tongue, cow biltong prosciutto hamburger ball tip meatloaf. Tail tenderloin fatback, buffalo jowl frankfurter spare ribs ham hock shank bresaola pork belly tongue pork loin flank.',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s',
            [new Ingredient('Ingredient01', 1), new Ingredient('Ingredient02', 2)]
        ),
        new Recipe(
            'TestRecipe2',
            'Description 02',
            // 'Short ribs pork corned beef kevin landjaeger jerky. Ball tip kevin biltong, pork loin alcatra prosciutto landjaeger pork pancetta shank short ribs pork chop corned beef. Sausage picanha ham hock shankle meatball rump bacon swine beef cow pork loin. Pig brisket strip steak drumstick, shankle bresaola biltong ham hock pork loin porchetta buffalo alcatra cow shoulder. Kielbasa strip steak shoulder ball tip sirloin leberkas hamburger. Rump tail pork belly turducken beef.',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtcXb2aEp1w1AtTWeAO8eeNtd9a-jkEyZhRmldIBE3PZAecY7ig&s',
            [new Ingredient('Ingredient03', 3), new Ingredient('Ingredient04', 4)]
        )
    ];

    // returning a copy of array object
    getRecipes() {
        return this.recipes.slice();
    }
}