import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // providers: [TasksService] ---> using Angular's ElementInjector to inject services to a component and its children
  // IMPORTANT: injecting a service like above causes to duplicate instances of a service, for example if you have used two <app-tasks />,
  //            components each one will have an instance of tasksService that are NOT related to each other
})
export class TasksComponent {}
