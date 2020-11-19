import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
    constructor(
        private auth: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    isLogginMode = true;
    isLoading = false;
    error = null;
    alertSubClose: Subscription;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;


    onSwitchMode() {
        this.isLogginMode = !this.isLogginMode;
    }

    onFormSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        this.isLoading = true;
        let authObsrv: Observable<AuthResponseData>;

        if (this.isLogginMode) {
            authObsrv = this.auth.login(form.value.email, form.value.password);
        } else {
            authObsrv = this.auth.singUp(form.value.email, form.value.password);
        }
        form.reset();

        authObsrv.subscribe(
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
        );
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
