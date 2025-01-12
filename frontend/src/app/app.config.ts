import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { AuthService } from './core/services/auth.service';
import { authInterceptor } from './core/services/auth-interceptor.interceptor';
import { DateFormatPipe } from './core/pipes/date-format.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthService,
    importProvidersFrom(DateFormatPipe),
    provideToastr({
        timeOut: 5000,
        positionClass: 'toast-bottom-left',
        preventDuplicates: true,
        maxOpened: 3,
        autoDismiss: true,
    })
  ]
};
