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

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        default:
            return state;
    }

}
