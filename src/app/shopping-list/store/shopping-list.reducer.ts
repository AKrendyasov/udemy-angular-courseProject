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
        editedIngredientIndex: null,
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
            const oldIngredient = state.ingredients[state.editedIngredientIndex]
            const updatedIngredient = {
                ...oldIngredient,
                ...action.payload
            };

            const updatedIngredients =[...state.ingredients]
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient


            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: null,
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient: Ingredient, ingredientIndex: number) => {
                    return ingredientIndex !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: null,
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload,
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: null,
            }

        default:
            return state;
    }

}
