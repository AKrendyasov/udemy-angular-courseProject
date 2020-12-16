import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>;
    private subscription: Subscription;

    constructor(
        private slService: ShoppingListService,
        private loggingService: LoggingService,
        private store: Store<fromShoppingList.AppStateStructure>,
    ) {
    }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');

        /*        this.ingredients = this.slService.getIngredients();
                this.subscription = this.slService.ingredientsChanged
                    .subscribe(
                        (ingredients: Ingredient[]) => {
                            this.ingredients = ingredients;
                        }
                    );
                this.loggingService.printLastLog('Hello form SLComponent')*/
    }

    onEditItem(index: number) {
        this.store.dispatch(new ShoppingListActions.StartEdit(index))
/*
        this.slService.startedEditing.next(index);*/
    }

    ngOnDestroy() {
        /*  this.subscription.unsubscribe();*/
    }
}
