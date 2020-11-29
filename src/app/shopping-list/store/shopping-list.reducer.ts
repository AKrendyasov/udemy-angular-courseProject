import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export class InitialState {
    public ingredients: Ingredient[];
}


const initialState: InitialState =
    {
        ingredients: [
            new Ingredient('Apples', 5),
            new Ingredient('Tomatoes', 10)
        ]
    };

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const oldIngredient = state.ingredients[action.payload.index]
            const updatedIngredient = {
                ...oldIngredient,
                ...action.payload.ingredient
            };

            const updatedIngredients =[...state.ingredients]
            updatedIngredients[action.payload.index] = updatedIngredient


            return {
                ...state,
                updatedIngredients
            };
        default:
            return state;
    }

}
