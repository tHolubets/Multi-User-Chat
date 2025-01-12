import { Component } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { AuthService } from './core/services/auth.service';
import { LoginComponent } from './pages/login/login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ChatComponent, LoginComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'chat-angular';

    constructor(
        private _authService: AuthService,
    ) { }

    public isLoggedIn(): boolean {
        const res = this._authService.isLoggedIn();
        return res;
    }
}
