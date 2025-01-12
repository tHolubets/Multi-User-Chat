import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { WebSocketService } from '../../core/services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageDto } from '../../core/interfaces/interfaces';
import { AuthService } from '../../core/services/auth.service';
import { ChatService } from '../../core/services/chat.service';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from "../../core/pipes/date-format.pipe";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DateFormatPipe
    ],
    providers: [DatePipe],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    @ViewChild('messagesContainer') private messagesContainer: ElementRef | undefined;
    
    public messages: ChatMessageDto[] = [];
    public newMessage: string = '';
    public username: string | null = 'NewUser';
    private page: number = 0;
    private size: number = 50;
    private totalPages: number = 1;

    constructor(
        private webSocketService: WebSocketService,
        private authService: AuthService,
        private chatService: ChatService
    ) {
        this.username = this.authService.getUsername();
    }

    ngOnInit() {
        this.loadMessages();
        this.webSocketService.connect();
        this.webSocketService.getMessages().subscribe((message: ChatMessageDto) => {
            this.messages.push(message);
        });
    }

    ngOnDestroy() {
        this.webSocketService.disconnect();
    }

    public loadMessages(): void {
        this.chatService.getMessages(this.page, this.size).subscribe((response) => {
            this.messages = response.messages;
            this.totalPages = response.totalPages;
            console.log("loadMessages", this.page);
            if (this.page === 0) {
                this.scrollToBottom();
            }
        });
    }

    public nextPage(): void {
        if (this.totalPages > this.page) {
            this.page++;
            this.loadMessages();
        }
    }

    public sendMessage() {
        if (this.newMessage.trim()) {
            this.webSocketService.sendMessage(this.newMessage);
            this.newMessage = '';
        }
    }

    private scrollToBottom(): void {
        console.log("scroll1");
        if (this.messagesContainer) {
            console.log("scroll");
            this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }
    }
}
