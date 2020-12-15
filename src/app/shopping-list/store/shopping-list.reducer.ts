import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { compareNumbers } from '@angular/compiler-cli/src/diagnostics/typescript_version';
import { DELETE_INGREDIENT } from './shopping-list.actions';

export interface ShoppingListStateStructure {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppStateStructure {
    shoppingList: ShoppingListStateStructure
}


const initialState: ShoppingListStateStructure =
    {
        ingredients: [
            new Ingredient('Apples', 5),
            new Ingredient('Tomatoes', 10)
        ],
        editedIngredient: null,
        editedIngredientIndex: -1,
    };

export function shoppingListReducer(state: ShoppingListStateStructure = initialState, action: ShoppingListActions.ShoppingListActions) {
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
                ingredients: updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient: Ingredient, ingredientIndex: number) => {
                    return ingredientIndex !== action.payload;
                })
            };

        default:
            return state;
    }

}
