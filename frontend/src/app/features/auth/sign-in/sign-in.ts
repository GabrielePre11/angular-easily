import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Eye, EyeClosed, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInBody } from '../../../models/types/auth.type';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected readonly Eye = Eye;
  protected readonly EyeClosed = EyeClosed;

  isPasswordVisible = signal<boolean>(false);

  signUpForm = this.fb.group({
    email: this.fb.control<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });

  togglePassword(e: Event) {
    e.preventDefault();
    this.isPasswordVisible.update((prev) => !prev);
  }

  onSubmit(e: Event) {
    e.preventDefault();

    this.signUpForm.markAllAsTouched();
    this.signUpForm.markAsDirty();

    if (this.signUpForm.invalid) return;

    this.authService
      .signIn(this.signUpForm.getRawValue() as SignInBody)
      .subscribe({
        next: () => {
          this.signUpForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
      });
  }
}
