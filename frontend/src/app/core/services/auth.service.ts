import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private _httpClient: HttpClient,
        private _toastrService: ToastrService,
    ) { }

    public isLoggedIn(): boolean {
        let token = localStorage.getItem('token');
        return token != null;
    }

    public signOut(): void {
        localStorage.removeItem('token');
    }

    public setToken(token: string): void {
        const tokenString: string = JSON.stringify(token);
        localStorage.setItem('token', tokenString);
        this._toastrService.success("Welcome!");
    }

    public getToken(): string | null {
        let token = localStorage.getItem('token');
        if (token != null) {
            token = JSON.parse(token);
        }
        return token;
    }

    public getUsername(): string | null {
        return localStorage.getItem('username');
    }

    public setUsername(username: string): void {
        localStorage.setItem('username', username);
    }

    public login(username: string, password: string): Observable<boolean> {
        const authBody = { username: username, password: password };
        return this._httpClient.post<any>(`${environment.apiUrl}/auth/login`, authBody, { observe: "response" })
            .pipe(map((response: HttpResponse<any>) => {
                if (response.status === 200 && response.body !== null) {
                    this.setToken(response.body.token);
                    this.setUsername(response.body.username);
                    return true;
                } else {
                    return false;
                }
            }),
                catchError((error) => {
                    this._toastrService.error("Login data is not valid. Try again.")
                    return of(false);
                })
            );
    }
}
