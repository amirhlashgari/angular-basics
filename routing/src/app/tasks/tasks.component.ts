import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  // userId = input.required<string>(); ---> IMPORTANT: normally child routes doesn't get the part of route that is not related inside their 'path' but it could be solved using "paramsInheritanceStrategy: always"
  userId = input.required<string>();
  private tasksService = inject(TasksService);
  userTasks = computed(() => this.tasksService.allTasks().filter(
    task => task.userId === this.userId()
  ));
}
