import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    public username: string = "";
    public password: string = "";

    constructor (
        private authService: AuthService
    ) {}

    public login(): void {
        this.authService.login(this.username, this.password).subscribe(success => {});
    }
}
