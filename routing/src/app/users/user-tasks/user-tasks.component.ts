import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // userId = input.required<string>();
  userName = input.required<string>();
  message = input.required<string>(); //this is the static data provided inside the app route object

  // private activatedRoute = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => console.log(data) ----> accessing route data (static<data> & dynamic<resolver>) inside component without using input
  //   });
  // }
}

/**
 * About Resolver Function:
 * 
 * it would re-execute if a route parameter changes but NOT queryParam changes.
 * so to change this behavior you should add another property to the route configuration.
 * runGuardsAndResolvers: 'always' | 'paramsOrQueryParamsChange' ---> this should be added to route config
 */
export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService); // NOTE: injecting dependency outside a class is ONLY available for resolver functions that is provided by Angular
  const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';

  return userName;
};

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {

  return resolveUserName(activatedRoute, routerState) + '\'s Tasks';
};