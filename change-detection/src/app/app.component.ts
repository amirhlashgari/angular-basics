import { Component } from '@angular/core';

import { CounterComponent } from './counter/counter.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CounterComponent, MessagesComponent],
})
export class AppComponent {
  get debugOutput() {
    console.log('[AppComponent] "debugOutput" binding re-evaluated.');
    return 'AppComponent Component Debug Output';
    /**
     * return Math.random()
     * if you see logs you will see that all the logs acccuired will execute twice, 
     * this will happen only in developement and if you build --prod this behavior won't happen. this is for 
     * rechecking the attributes and if you return a random number as first line it would cause an error in the 
     * second round of checkings.
     * IMPORTANT: therefore you shouldn't put expensive calculations into templates, 
     * the expressions in your template-binding should be simple and staight forward.
     */
  }
}
