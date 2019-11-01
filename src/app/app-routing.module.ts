import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';


const appRoutes: Routes = [
    // added redirect such that the default landing page is recipes
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children:[
      {path: '', component: RecipeStartComponent},
      {path: ':id', component: RecipeDetailComponent}
    ] },
    { path: 'shoppinglist', component: ShoppingListComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}