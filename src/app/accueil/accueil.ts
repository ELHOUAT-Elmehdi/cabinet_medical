import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
  imports:[CommonModule]
})
export class AccueilComponent implements OnInit {

  userRole: string | null = null;
  userName: string | null = null;
  isAuthenticated: boolean = false;

  // Statistiques du cabinet (exemple)
  stats = {
    totalPatients: 0,
    totalMedecins: 0,
    consultationsToday: 0,
    rendezVousEnAttente: 0
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.loadDashboardData();
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userRole = this.authService.getUserRole();
      this.userName = this.authService.getUserName();
    }
  }

  loadDashboardData(): void {
    // Ici vous pouvez charger les statistiques depuis votre API
    // Exemple avec des données mockées
    this.stats = {
      totalPatients: 150,
      totalMedecins: 8,
      consultationsToday: 12,
      rendezVousEnAttente: 5
    };
  }

  navigateToLogin(): void {
    this.router.navigate(['/sign-in']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/sign-up']);
  }

  navigateToModule(module: string): void {
    switch(module) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'medecin':
        this.router.navigate(['/medecin']);
        break;
      case 'patient':
        this.router.navigate(['/patient']);
        break;
      default:
        console.log('Module non reconnu');
    }
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.userRole = null;
    this.userName = null;
  }
}
