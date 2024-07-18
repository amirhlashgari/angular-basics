import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { Inject, InjectionToken } from '@angular/core';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

// ------- another way(Application root EnvironmentInjector) of injecting services to the root, instead of using Injectable decorator (this is not very optimized)
// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));

// NOTE: this is the in detailed model and under the hood of injecting, above example is shortcut.
// export const TaskServiceToken = new InjectionToken<TasksService>('tasks-service-token');
// bootstrapApplication(AppComponent, {
//     providers: [{ provide: TaskServiceToken, useClass: TasksService }]
// }).catch((err) => console.error(err));

// NOTE: its instantiating in components differs and is like below
// constructor(@Inject(TaskServiceToken) private tasksService: TasksService) {}