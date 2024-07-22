import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { resolveUserTasks, TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 0.9) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        // runGuardsAndResolvers: 'paramsOrQueryParamsChange', ---> to re-execute component if queryParam change
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'prefix'
            },
            {
                path: 'tasks',
                component: TasksComponent,
                runGuardsAndResolvers: 'always',
                resolve: { userTasks: resolveUserTasks },
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent,
                canDeactivate: [canLeaveEditPage]
            }
        ],
        canMatch: [dummyCanMatch],
        data: { message: 'Static Data' },
        resolve: { userName: resolveUserName },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];