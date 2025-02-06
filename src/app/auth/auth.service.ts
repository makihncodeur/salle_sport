import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor(private router: Router) {
    // Charger des utilisateurs fictifs pour le démo
    this.users = [
      { id: 1, email: 'user@example.com', password: 'password', name: 'John Doe' }
    ];
  }

  // Inscription
  register(email: string, password: string, name: string): boolean {
    const userExists = this.users.some(user => user.email === email);
    if (userExists) {
      return false; // L'utilisateur existe déjà
    }
    const newUser: User = { id: this.users.length + 1, email, password, name };
    this.users.push(newUser);
    return true;
  }

  // Connexion
  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Déconnexion
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  // Récupérer l'utilisateur actuel
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Modifier le mot de passe
  updatePassword(email: string, newPassword: string): boolean {
    const user = this.users.find(u => u.email === email);
    if (user) {
      user.password = newPassword;
      return true;
    }
    return false;
  }

  // Supprimer un compte
  deleteAccount(email: string): boolean {
    const index = this.users.findIndex(u => u.email === email);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.logout();
      return true;
    }
    return false;
  }
}
