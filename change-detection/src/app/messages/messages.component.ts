import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,  // would cause limitation on amount of events and thisngs that could trigger change detectionyou shouldn't use onPush if your changes would affect all components
  // NOTE: but if this component changes it would cause others to be checked, if you don't want so you should implement onPush on all irrelevant components
})
export class MessagesComponent {

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }
}
