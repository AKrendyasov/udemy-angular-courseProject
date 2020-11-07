import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private auth: AuthService) {
  }
  isLogginMode = false;
  isLoading = false;
  error = null;
  


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
      form.reset();
    }
    else {
      authObsrv = this.auth.singUp(form.value.email, form.value.password);
      form.reset();
    }

    authObsrv.subscribe(
        responseData => {
          this.isLoading = false;
          this.error = null;
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
    );
  }
}
