export interface CustomUserDto {
    id: number;
    username: string;
}

export interface ChatMessageDto {
    id: number;
    message: string;
    dateTime: string;
    userDto: CustomUserDto;
}

export interface MessageResponseDto {
    messages: ChatMessageDto[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}