import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Eye, EyeClosed, LucideAngularModule } from 'lucide-angular';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  protected readonly Eye = Eye;
  protected readonly EyeClosed = EyeClosed;

  isPasswordVisible = signal<boolean>(false);

  signUpForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  togglePassword(e: Event) {
    e.preventDefault();
    this.isPasswordVisible.update((prev) => !prev);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.signUpForm.value);
  }
}
