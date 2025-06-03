import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgIf} from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './sign-in.html',
  standalone: true,
  styleUrl: './sign-in.css'
})
export class SignIn {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  submit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password, rememberMe } = this.loginForm.value;

    // Simulation d'authentification (remplacez par votre logique réelle)
    setTimeout(() => {
      this.loading = false;

      // Exemple de vérification basique
      if (email === 'admin@example.com' && password === 'admin123') {
        // Stockage simple du token en localStorage si "Se souvenir de moi" est coché
        if (rememberMe) {
          localStorage.setItem('authToken', 'simulated-token');
        } else {
          sessionStorage.setItem('authToken', 'simulated-token');
        }
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Email ou mot de passe incorrect';
      }
    }, 1000);
  }

  f(controlName: string) {
    return this.loginForm.get(controlName);
  }

  getError(controlName: string): string {
    const control = this.f(controlName);
    if (!control || !control.errors || (!control.touched && !this.submitted)) return '';

    if (control.errors['required']) return 'Ce champ est obligatoire';
    if (control.errors['email']) return 'Email invalide';

    return '';
  }
}
