import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from './response.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVEzWZUkPVwtChk1NpvG7ewlNJzDs8CFE';
    // tslint:disable-next-line: max-line-length
    private readonly signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVEzWZUkPVwtChk1NpvG7ewlNJzDs8CFE';
    user = new BehaviorSubject<User>(null);
    userIn: User = null;

    constructor(private httpClient: HttpClient) {

    }

    signUp(emailId: string, passWord: string) {
        return this.httpClient.post<AuthResponseData>(this.signUpUrl, {
            email: emailId,
            password: passWord,
            returnSecureToken: true
        }).pipe(catchError(errorResponse => {
            let errorMessage = 'An unknown error occured';
            if (!errorResponse.error || !errorResponse.error.error) {
                return throwError(errorMessage);
            }
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'Email already exists';
            }
            return throwError(errorMessage);
        }));
    }

    signIn(emailId: string, passWord: string) {
        return this.httpClient.post<AuthResponseData>(this.signinUrl, {
            email: emailId,
            password: passWord,
            returnSecureToken: true
        }).pipe(catchError(errorResponse => {
            let errorMessage = 'An unknown error occured.';
            console.log(errorResponse);
            if (!errorResponse.error || !errorResponse.error.error) {
                return throwError(errorMessage);
            }
            switch (errorResponse.error.error.message) {
                case 'INVALID_PASSWORD':
                    errorMessage = 'INVALID PASSWORD entered.';
            }
            return throwError(errorMessage);
        }), tap(responseData => {
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
            const userObj = new User(responseData.email,
                responseData.localId,
                responseData.idToken,
                expirationDate);
            this.user.next(userObj);
            this.userIn = userObj;
            console.log('User logged in.');
            console.log(userObj);
        }));
    }

    logOut(){
        this.userIn = null;
        this.user.next(null);
    }
}
