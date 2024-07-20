import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    form = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    onSubmit(formData: NgForm) { }
}