import { Component ,Input,HostListener} from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isOpen = false;
  activeClass = 'tw-bg-gray-600 tw-bg-opacity-25 tw-text-gray-100 tw-border-gray-100'
  inactiveClass = 'tw-border-gray-900 tw-text-gray-500 tw-hover:bg-gray-600 tw-hover:bg-opacity-25 tw-hover:text-gray-100'

  isSidebarHidden: boolean = false; // Par défaut, la sidebar est visible

  // Méthode pour basculer la sidebar
  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  // Détecter la taille de l'écran et masquer la sidebar en mode mobile
  
}
