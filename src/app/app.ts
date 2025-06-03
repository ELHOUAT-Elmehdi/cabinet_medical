import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'cabinet-medical';
}
