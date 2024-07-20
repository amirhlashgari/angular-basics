import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const req = request.clone({ headers: request.headers.set('Authorization', 'token') });
    console.log(`[Outgoing Request]-${req.method}-${req.url}`);
    return next(req).pipe(
        tap({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    console.log(`[Incoming Response]-${event.status}-${event.body}`);
                }
            }
        })
    );
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(
        withInterceptors([loggingInterceptor])
    )]
}).catch((err) => console.error(err));
