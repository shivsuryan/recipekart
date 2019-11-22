import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpResponse } from './response.model';

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
        });
    }

    login(emailId: string, passWord: string) {
        return this.httpClient.post<SignUpResponse>(this.authUrl, {
            email: emailId,
            password: passWord,
            returnSecureToken: true
        });
    }
}
