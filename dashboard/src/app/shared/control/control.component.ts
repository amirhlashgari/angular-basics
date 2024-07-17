import { Component, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, // makes css classes global
  host: {
    class: "control", // adds class="control" attribute to the app-control element in the dom
    // '(click)': 'onClick()' ---> IMPORTANT: binding a listener to the element
  }
})
export class ControlComponent {
  // -------------------------------------IMPORTANT NOTES----------------------------------------
  // @HostBinding('class') className = 'control'; ----> another way to bind class to an element
  // @HostListener('click') onClick() {console.log("clicked")} ----> another way to bind listener
  // private el = inject(ElementRef); ----> how to access element programmatically(using reference)
  label = input.required<string>();

}
