import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes, 
            withComponentInputBinding(), // NOTE: withComponentInputBinding helps to fetch our dynamic data through input()s if the name of it be the same
            withRouterConfig({ paramsInheritanceStrategy: 'always' }) // used to get access to current full url in the child components
        )
    ],
};