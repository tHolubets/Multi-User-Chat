import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authToken = authService.getToken();
    if (authToken) {
        const modifiedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
                'Access-Control-Allow-Origin': '*'
            }
        });
        return next(modifiedReq);
    }
    return next(req);
};