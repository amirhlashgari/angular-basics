import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

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

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
    const loadedForm = JSON.parse(savedForm);
    initialEmailValue = loadedForm.email;
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
    private destroyRef = inject(DestroyRef);
    form = new FormGroup({
        email: new FormControl(initialEmailValue, {
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

    ngOnInit(): void {


        const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
            next: (value) => {
                window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email })); // to save form in unwanted refreshs 
            }
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    onSubmit() {
        // console.log(this.form) ---> this object is as TemplateDriven approach, but typescript now understands our shape of form now
        const enteredEmail = this.form.value.email;
        const enteredPassword = this.form.value.password;
    }
}