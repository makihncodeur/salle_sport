import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  @Output() toggleSidebarEvent = new EventEmitter<void>(); // Événement pour la sidebar

  toggleSidebar() {
    this.toggleSidebarEvent.emit(); // Émettre un signal au parent
  }
  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
