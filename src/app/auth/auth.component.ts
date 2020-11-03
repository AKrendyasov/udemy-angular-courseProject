import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    if (this.isLogginMode) {

    }
    else {
      this.auth
          .singUp(form.value.email, form.value.password)
          .subscribe(
              responseData => {
                this.isLoading = false;
              },
              errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
              }
          );
      form.reset();
    }
  }
}
