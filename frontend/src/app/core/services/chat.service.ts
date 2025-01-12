import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageResponseDto } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    public getMessages(page: number, size: number): Observable<MessageResponseDto> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', 'id,desc');

        return this._httpClient.get<MessageResponseDto>(`${environment.apiUrl}/chat/messages`, {
            params
        });
    }
}
