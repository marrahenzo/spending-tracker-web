import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }

    this.authService
      .signup({
        name: this.form.get('name')?.value,
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: ({ error }) => {
          this.toast.error(error.message);
        },
      });
  }

  isFieldValid(name: string) {
    const field = this.form.get(name);
    return !field?.valid && field?.touched;
  }
}
