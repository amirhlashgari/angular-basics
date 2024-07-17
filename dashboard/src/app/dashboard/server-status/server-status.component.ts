import { AfterViewInit, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus: 'offline' | 'online' | 'unknown' = 'online';
  // private interval?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.5) {
        this.currentStatus = 'offline';
      } else if (rand < 0.9) {
        this.currentStatus = 'online';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);

    // new way of destroying on component destroy
    this.destroyRef.onDestroy(() => {
      clearInterval(interval)
    });
  }

  ngAfterViewInit(): void {
    console.log("AFTER VIEW INIT")
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.interval);
  // }
}
