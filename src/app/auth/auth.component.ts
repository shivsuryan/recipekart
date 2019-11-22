import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    isLoginMode = false;
    isLoading = false;

    constructor(private authService: AuthService){
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        if (!this.isLoginMode) {
            console.log('SignUp request');
            const formValue = form.value;
            this.authService.signUp(formValue.email, formValue.passowrd).subscribe(response => {
                console.log(response);
                this.isLoginMode = false;
                this.isLoading = false;
            }, errorResponse => {
                console.log(errorResponse.error);
                this.isLoginMode = false;
                this.isLoading = false;
            });
        } else{
            console.log('Login request');
            const formValue = form.value;
            this.authService.signUp(formValue.email, formValue.passowrd).subscribe(response => {
                console.log(response);
                this.isLoginMode = false;
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.isLoginMode = false;
                this.isLoading = false;
            });
        }
    }



}
