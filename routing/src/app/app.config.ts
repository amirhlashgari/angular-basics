import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()) // NOTE: withComponentInputBinding helps to fetch our dynamic data through input()s if the name of it be the same
    ],
};