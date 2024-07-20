import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const req = request.clone({ headers: request.headers.set('Authorization', 'token') });
    console.log(`[Outgoing Request]-${req.method}-${req.url}`);
    return next(req);
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(
        withInterceptors([loggingInterceptor])
    )]
}).catch((err) => console.error(err));
