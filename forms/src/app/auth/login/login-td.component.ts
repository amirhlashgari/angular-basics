import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-td',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-td.component.html',
  styleUrl: './login.component.css',
})
export class TemplateDrivenLoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if(savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        // timeout function below is to wait to form to initialize to can penetrate data to it.
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 10);
      }

      // NOTE: debounceTime operator is to manage not saving each moment change in the localStorage and wait 0.5s after user stops typing to apply changes, to avoid performing too much saves and not being optimized
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
      });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    formData.form.reset();
  }
}
