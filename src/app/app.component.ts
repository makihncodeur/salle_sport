import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion_abonnement';
  isSidebarHidden: boolean = false; // Par défaut, la sidebar est visible

  // Méthode pour basculer la sidebar
  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  isAuthPage : boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
    const authRoutes = ['/auth/login', '/auth/register'];
    this.isAuthPage = authRoutes.includes(this.router.url);
    });
  }

}
