import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    isLoginMode = false;
    isLoading = false;
    isError = false;
    errorMessage = 'An unknown error occured';
    authObservable: Observable<any>;

    constructor(private authService: AuthService, private router: Router) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        const formValue = form.value;
        if (!this.isLoginMode) {
            console.log('SignUp request');
            this.authObservable = this.authService.signUp(formValue.email, formValue.passowrd);
        } else {
            console.log('Login request');
            this.authObservable = this.authService.signIn(formValue.email, formValue.passowrd);
        }

        this.authObservable.subscribe(response => {
            this.isLoginMode = false;
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.isLoginMode = false;
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = errorMessage;

        });
    }
}
