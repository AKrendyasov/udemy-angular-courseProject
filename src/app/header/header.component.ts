import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isAuthenticated:boolean =  false;
    private userSubscription: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppStateStructure>,
    ) {
    }
    ngOnInit(): void {
        this.userSubscription = this.store.select('auth', 'user').subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
      this.dataStorageService
          .fetchRecipes()
          .subscribe()
    }

    onLogout() {
/*        this.authService.logout();*/
        this.store.dispatch(new AuthActions.Logout())
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe()
    }
}
