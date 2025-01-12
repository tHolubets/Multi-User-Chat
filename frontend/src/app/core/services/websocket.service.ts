import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { ChatMessageDto } from '../interfaces/interfaces'; // Import the DTO interface
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private client: Client;
    private messageSubject: Subject<ChatMessageDto> = new Subject<ChatMessageDto>();

    constructor(
        private _authService: AuthService
    ) {
        this.client = new Client({
            brokerURL: `${environment.apiUrl}/chatws?token=` + this._authService.getToken(),
            connectHeaders: {
                'Authorization': 'Bearer ' + this._authService.getToken()
            },
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                this.client.subscribe('/chat/1', (message: IMessage) => {
                    const chatMessage: ChatMessageDto = JSON.parse(message.body);
                    this.messageSubject.next(chatMessage);
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
            }
        });
    }

    connect() {
        this.client.activate();
    }

    disconnect() {
        this.client.deactivate();
    }

    sendMessage(message: string) {
        this.client.publish({ destination: '/app/sendMessage', body: message });
    }

    getMessages() {
        return this.messageSubject.asObservable();
    }
}