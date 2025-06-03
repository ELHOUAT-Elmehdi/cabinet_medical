import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'medecin' | 'patient';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Ne plus charger depuis localStorage
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUserRole(): string | null {
    return this.currentUserSubject.value?.role ?? null;
  }

  getUserName(): string | null {
    return this.currentUserSubject.value?.name ?? null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.validateCredentials(email, password)) {
          const user = this.getMockUser(email);
          this.setCurrentUser(user);
          resolve(true);
        } else {
          reject(new Error('Identifiants invalides'));
        }
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  private validateCredentials(email: string, password: string): boolean {
    const validUsers = [
      { email: 'admin@cabinet.com', password: 'admin123' },
      { email: 'medecin@cabinet.com', password: 'medecin123' },
      { email: 'patient@cabinet.com', password: 'patient123' }
    ];
    return validUsers.some(u => u.email === email && u.password === password);
  }

  private getMockUser(email: string): User {
    if (email === 'admin@cabinet.com') {
      return { id: '1', name: 'Administrateur', email, role: 'admin' };
    } else if (email === 'medecin@cabinet.com') {
      return { id: '2', name: 'Dr. Martin', email, role: 'medecin' };
    } else {
      return { id: '3', name: 'Patient Dupont', email, role: 'patient' };
    }
  }

  register(userData: any): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  }

  hasRole(requiredRole: string): boolean {
    const userRole = this.getUserRole();
    if (!userRole) return false;
    return userRole === 'admin' || userRole === requiredRole;
  }

  canAccessModule(module: string): boolean {
    const role = this.getUserRole();
    if (!role) return false;
    switch (module) {
      case 'admin': return role === 'admin';
      case 'medecin': return role === 'admin' || role === 'medecin';
      case 'patient': return role === 'patient';
      default: return false;
    }
  }
}
