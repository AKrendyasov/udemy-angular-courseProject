import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { fromEvent, interval, Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { mergeAll, switchAll, concatAll, combineAll, map, delay, debounceTime, take, exhaustMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';



@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    constructor(
        private auth: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppStateStructure>
    ) {
    }

    isLogginMode = true;
    isLoading = false;
    error = null;
    alertSubClose: Subscription;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    ngOnInit(): void {
        this.store.select('auth').subscribe(authState=>{
            this.isLoading = authState.loading;
            this.error = authState.authError
            if (this.error) {
                this.showErrorAlert(this.error);
            }

        })

    }

    onSwitchMode() {
        this.isLogginMode = !this.isLogginMode;

        const pokemonId$ = of(1, 5, 6);

        function getPokemonName(id: number) {
            return ajax.getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
                map(({ name }) => name),
                delay(2000)
            );
        }

            // mergeAll will subscribe to all of the inner Observables concurrently:
            // all requests will be made in parallel
        pokemonId$
            .pipe(
                map(id => getPokemonName(id)),
                mergeAll()
            )
            .subscribe((value => {
                console.log ('mergeAll', value)
            }));
            // Output: (2s) bulbasaur, charmeleon, charizard

            // concatAll subscribes to each inner Observable only after the previous one has completed:
            // it will wait until each request is done, before making a new one
        pokemonId$
            .pipe(
                map(id => getPokemonName(id)),
                concatAll()
            )
            .subscribe((value => {
                console.log ('concatAll', value)
            }));
            // Output: (2s) bulbasaur, (2s) charmeleon, (2s) charizard

            // switchAll will subscribe to the most recently emitted inner Observable:
            // it will only emit the response from the most recent request
        pokemonId$
            .pipe(
                map(id => getPokemonName(id)),
                switchAll()
            )
            .subscribe((value => {
                console.log ('switchAll', value)
            }));

            // combineAll will wait until it has every value, and then combines them into an array
        pokemonId$
            .pipe(
                map(id => getPokemonName(id)),
                combineAll()
            )
            .subscribe((value => {
                console.log ('combineAll', value)
            }));
/*
        interval(100).pipe(
            debounceTime(200)
        ).subscribe(vl => console.log('debounceTime',vl));

        const clicks = fromEvent(document, 'click');
        const result = clicks.pipe(
            exhaustMap(ev => interval(1000).pipe(take(5)))
        );
        result.subscribe(x => console.log('exhaustMap x', x));*/
    }

    onFormSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        this.isLoading = true;
        let authObsrv: Observable<AuthResponseData>;

        if (this.isLogginMode) {
            this.store.dispatch(new AuthActions.LoginStart({
                email: form.value.email,
                password: form.value.password,
            }))
        } else {
            this.store.dispatch(new AuthActions.SignupStart({
                email: form.value.email,
                password: form.value.password,
            }))
        }
        form.reset();

/*        authObsrv.subscribe(
            responseData => {
                this.isLoading = false;
                this.error = null;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        );*/
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        alertComponentRef.instance.message = message;
        this.alertSubClose = alertComponentRef.instance.close.subscribe(() => {
            this.alertSubClose.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy() {
        if (this.alertSubClose) {
            this.alertSubClose.unsubscribe();
        }
    }
}
