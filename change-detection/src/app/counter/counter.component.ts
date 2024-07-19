import { Component, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
  count = signal(0);

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit() {
    // below calculations are okay to happen here because it causes state of application and it would change sth somewhere else
    setTimeout(() => {
      this.count.set(0);
    }, 4000)

    // but the below function is a very bad place to log something because it would cause zone.js runs its change detection mechanism and as it log says and re-render all components due to nothing
    // NOTE: in such cases angular gives us a tool up-out the change detection and avoid zone pollution ---> NgZone
    // setTimeout(() => {
    //   console.log("would cause unnecessary re-render")
    // }, 4000)

    // this.zone.runOutsideAngular(() => {
    //   // this way below timeout won't be watched by zonejs change detection
    //   setTimeout(() => {
    //     console.log("would cause unnecessary re-render")
    //   }, 4000)
    // })

    // NOTE: by going zoneLess this timeout won't be a challenge anymore
    setTimeout(() => {
      console.log("would NOT cause unnecessary re-render due to not using zone.js anymore")
    }, 4000)
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
