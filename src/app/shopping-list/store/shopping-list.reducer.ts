import * as ShoppingListActions from '../store/shopping-list.action';
import { Ingredient } from 'src/app/shared/ingredient,model';

export const initialState = {
  ingredients: [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Apples', 6)
  ]
}

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      {
        return state;
      }
  }
}
