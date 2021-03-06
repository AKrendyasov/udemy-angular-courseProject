import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private store: Store<fromApp.AppStateStructure>
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.store.select('auth', 'user').pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(request);
                }
                const modifiedRequest = request.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedRequest);
            })
        );
    }
}
