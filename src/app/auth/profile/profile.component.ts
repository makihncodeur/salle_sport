import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  newPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  updatePassword(): void {
    if (this.authService.updatePassword(this.user.email, this.newPassword)) {
      this.errorMessage = 'Mot de passe mis à jour avec succès.';
    } else {
      this.errorMessage = 'Erreur lors de la mise à jour du mot de passe.';
    }
  }

  deleteAccount(): void {
    if (this.authService.deleteAccount(this.user.email)) {
      this.authService.logout();
    } else {
      this.errorMessage = 'Erreur lors de la suppression du compte.';
    }
  }
}
