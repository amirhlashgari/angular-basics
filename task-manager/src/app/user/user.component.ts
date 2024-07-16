import { Component, computed, EventEmitter, Input, input, Output, signal } from '@angular/core';

import { CardComponent } from '../shared/card/card.component';

type User = {
  id: string;
  avatar: string;
  name: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  // select = output<string>(); ---> new way to define event emitters
  // avatar = input.required<string>(); ---> getting input using signals 
  // name = input.required<string>(); ---> getting input using signals

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
