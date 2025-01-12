import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { WebSocketService } from '../../core/services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageDto } from '../../core/interfaces/interfaces';
import { AuthService } from '../../core/services/auth.service';
import { ChatService } from '../../core/services/chat.service';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from "../../core/pipes/date-format.pipe";
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DateFormatPipe,
        ToastrModule
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
        private chatService: ChatService,
        private readonly toastrService: ToastrService,
    ) {
        this.username = this.authService.getUsername();
    }

    ngOnInit() {
        this.loadMessages();
        this.webSocketService.initClient();
        this.webSocketService.connect();
        this.webSocketService.getMessages().subscribe((message: ChatMessageDto) => {
            const wasScrollAtBottom = this.isScrollAtBottom();
            this.messages.push(message);
            if (wasScrollAtBottom)
                this.scrollToBottom();
        });
    }

    ngOnDestroy() {
        this.webSocketService.disconnect();
    }

    public loadMessages(): void {
        const prevScrollHeight = this.messagesContainer?.nativeElement.scrollHeight;
        this.chatService.getMessages(this.page, this.size).subscribe((response) => {
            this.messages = [...response.messages.reverse(), ...this.messages];
            this.totalPages = response.totalPages;
            if (this.page === 0)
                this.scrollToBottom();
            else
                setTimeout(() => {
                    if (this.messagesContainer)
                        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight - prevScrollHeight;
                }, 0);
        });
    }

    public sendMessage() {
        if (this.newMessage.trim()) {
            if (this.newMessage.length > 200) {
                this.toastrService.error("Message exceeds the maximum allowed length of 200 characters");
                return;
            }

            this.webSocketService.sendMessage(this.newMessage);
            this.newMessage = '';
        }
    }

    public scrollToBottom(): void {
        setTimeout(() => {
            if (!this.messagesContainer)
                return;
            this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }, 0);
    }

    protected onScroll(): void {
        if (this.messagesContainer) {
            const scrollTop = this.messagesContainer.nativeElement.scrollTop;

            if (scrollTop === 0 && this.page < this.totalPages - 1) {
                this.page++;
                this.loadMessages();
            }
        }
    }

    private isScrollAtBottom(): boolean {
        const messagesContainer = this.messagesContainer?.nativeElement;
        const approxPosition = messagesContainer.scrollHeight - messagesContainer.scrollTop;
        return approxPosition + 1 > messagesContainer.clientHeight && approxPosition - 1 < messagesContainer.clientHeight;
    }

    protected signOut(): void {
        this.authService.signOut();
        this.webSocketService.disconnect();
    }

    protected isSystemMessage(message: ChatMessageDto): boolean {
        return message.userDto.username === "system"
    }
}
