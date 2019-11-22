import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpResponse } from './response.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVEzWZUkPVwtChk1NpvG7ewlNJzDs8CFE';

    constructor(private httpClient: HttpClient) {

    }

    signUp(emailId: string, passWord: string) {
        return this.httpClient.post<SignUpResponse>(this.authUrl, {
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

    login(emailId: string, passWord: string) {
        return this.httpClient.post<SignUpResponse>(this.authUrl, {
            email: emailId,
            password: passWord,
            returnSecureToken: true
        });
    }
}
