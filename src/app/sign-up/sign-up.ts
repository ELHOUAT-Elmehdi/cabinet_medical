import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './sign-up.html',
  standalone: true,
  styleUrl: './sign-up.css'
})
export class SignUp implements OnInit {
  signUpForm!: FormGroup;
  hidePwd = true;
  hideConfirm = true;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      gender: ['Homme', Validators.required],
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        this.noWhitespaceValidator
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        this.noWhitespaceValidator
      ]],
      cin: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        this.cinValidator
      ]],
      birthDate: ['', Validators.required], // Validation d'âge supprimée
      phone: ['', [
        Validators.required,
        Validators.pattern(/^(\+?\d{10,15})$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      role: ['', Validators.required],
      specialty: [''],
      insuranceNumber: [''],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Validateur personnalisé pour vérifier que les mots de passe correspondent
  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors['mustMatch']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        matchingControl!.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  // Validateur pour la force du mot de passe
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return !valid ? { passwordStrength: true } : null;
  }

  // Validateur pour le CIN
  cinValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    // Validation basique pour CIN marocain (peut être adapté)
    const isValid = /^[A-Za-z]{1,2}\d+$/.test(value);
    return isValid ? null : { invalidCin: true };
  }

  // Validateur pour éviter les espaces vides
  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  submit(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.loading = true;
    console.log('Form Submitted:', this.signUpForm.value);
    // Ici vous ajouteriez votre appel API réel
    setTimeout(() => {
      this.loading = false;
      this.signUpForm.reset();
      this.submitted = false;
    }, 1000);
  }

  // Marque tous les champs comme touchés pour afficher les erreurs
  markAllAsTouched(): void {
    Object.values(this.signUpForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Helper pour accéder facilement aux contrôles du formulaire
  f(controlName: string): AbstractControl | null {
    return this.signUpForm.get(controlName);
  }

  // Helper pour afficher les erreurs
  getError(controlName: string): string {
    const control = this.f(controlName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Ce champ est obligatoire';
    if (control.errors['email']) return 'Email invalide';
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} caractères`;
    if (control.errors['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} caractères`;
    if (control.errors['pattern']) return 'Format invalide';
    if (control.errors['mustMatch']) return 'Les mots de passe ne correspondent pas';
    if (control.errors['passwordStrength']) return 'Le mot de passe doit contenir majuscules, minuscules, chiffres et caractères spéciaux';
    if (control.errors['invalidCin']) return 'CIN invalide';
    if (control.errors['whitespace']) return 'Ne peut pas être vide';

    return '';
  }
}
