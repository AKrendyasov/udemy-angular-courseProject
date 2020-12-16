import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../store/app.reducer'

import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>;

    constructor(
        private loggingService: LoggingService,
        private store: Store<fromApp.AppStateStructure>,
    ) {
    }

    ngOnInit() {
        this.ingredients = this.store.select('shoppingList');
    }

    onEditItem(index: number) {
        this.store.dispatch(new ShoppingListActions.StartEdit(index))
    }

    ngOnDestroy() {
    }
}
