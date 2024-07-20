import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
    if (control.value.includes('?')) {
        return null;
    }

    return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
    if (control.value !== 'test@test.com') {
        return of(null); // NOTE: of() operator emits an Observable(here is to simulate async validation from backend)
    }

    return of({ notUnique: true });
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    form = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.email, Validators.required],
            asyncValidators: [emailIsUnique]
        }),
        password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
        })
    });

    get emailIsInvalid() {
        return (this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid);
    }

    get passwordIsInvalid() {
        return (this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid);
    }

    onSubmit() {
        // console.log(this.form) ---> this object is as TemplateDriven approach, but typescript now understands our shape of form now
        const enteredEmail = this.form.value.email;
        const enteredPassword = this.form.value.password;
    }
}