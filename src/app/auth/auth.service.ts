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
    private tokenExpirationTimer;

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
            this.autoLogOut(+responseData.expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(userObj));
            console.log('User logged in.');
            console.log(userObj);
        }));
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpiryDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiryDate));
        if (loadedUser.token) {
            this.userIn = loadedUser;
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpiryDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    logOut() {
        this.userIn = null;
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }
}
