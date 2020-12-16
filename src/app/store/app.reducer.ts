import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppStateStructure {
    shoppingList: fromShoppingList.ShoppingListStateStructure
    auth: fromAuth.AuthStateStructure
}

export const appReducer: ActionReducerMap<AppStateStructure> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
}
