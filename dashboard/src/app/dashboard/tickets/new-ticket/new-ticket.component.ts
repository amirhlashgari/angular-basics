import { afterNextRender, afterRender, AfterViewInit, Component, ContentChildren, effect, ElementRef, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>; ----> another way to accessing an element inside the dom
  // private form = viewChild<ElementRef<HTMLFormElement>>('form'); ----> like above but returns signal
  // IMPORTANT: @ContentChildren('input') private control: ElementRef<HTMLFormElement | HTMLTextAreaElement> ----> for when we want to access projected content (using "ng-content")

  constructor() {
    // NOTE: these two methods(lifecycles) are new in angular and can be registered with help of constructor only
    afterRender(() => {
      // will render after ANY change ANY where in the dom
    });
    
    afterNextRender(() => {
      // will render after NEXT change ANY where in the dom
    });

    effect(() => {
      // IMPORTANT: looks for SIGNALs of component changes, because using signals results in not rendering constructor repeatedly
    });
  }

  ngAfterViewInit(): void {
    // IMPORTANT: in this element we are guaranteed that the view element (for example the above form view child) exists, in ngOnInit its not guaranteed that it be rendered yet.
    // NOTE: ngAfterContentInit is for when using ViewContent() decorator
    console.log("AFTER VIEW INIT");
  }

  onSubmit(titleElement: HTMLInputElement, textElement: HTMLTextAreaElement, formElement: HTMLFormElement) {

    // this.form?.nativeElement.reset(); ----> reseting in the above model
    formElement.reset();
  }
}
