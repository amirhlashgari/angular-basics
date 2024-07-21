import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();
  private usersService = inject(UsersService);

  userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);
}
