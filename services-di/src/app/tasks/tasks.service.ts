import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  // NOTE: another problem of using ElementInjector(using providers array in component) is that services can't reach out to them and they are accessible just by components. 
  private loggingService = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: {title: string, description: string}) {
    const newTask: Task = { ...taskData, id: Math.random().toString(), status: 'OPEN'};
    this.tasks.update((oldTask) => [...oldTask, newTask]);
    this.loggingService.log('Task Added with title ' + taskData.title);
  }
  
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));
    this.loggingService.log('Task changed to status ' + newStatus);
  }
}
