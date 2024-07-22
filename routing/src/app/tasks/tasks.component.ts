import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  // userId = input.required<string>(); ---> IMPORTANT: normally child routes doesn't get the part of route that is not related inside their 'path' but it could be solved using "paramsInheritanceStrategy: always"
  userId = input.required<string>();
  // order = input<'asc'|'desc'>(); ---> instead of all logic used inside ngOnInit, we could use this line. 
  order = signal<'asc' | 'desc'>('desc');
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  userTasks = computed(() => this.tasksService.allTasks()
    .filter(task => task.userId === this.userId())
    .sort((a, b) => this.order() === 'desc' ? (a.id > b.id ? -1 : 1) : (a.id > b.id ? 1 : -1))
  );

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: param => this.order.set(param['order'])
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
