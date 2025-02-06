import { Component,OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

interface Client {
  id: number;
  lastName: string;
  firstName: string;
  registrationDate: string;
  phoneNumber:Number;
  activeSubscription : boolean;
  offreAbonnement?: Offer; // Offre d'abonnement souscrite
}

interface Offer {
  id: number;
  offerName: string;
  durationMonths: number;
  monthlyPrice: number;
}
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  clients: Client[] = [];
  offers: Offer[] = [];
  startDate: string = '';
  endDate: string = '';

  constructor() {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.offers = JSON.parse(localStorage.getItem('offers') || '[]');
      this.clients = JSON.parse(localStorage.getItem('clients') || '[]');
    } else {
      console.warn('localStorage n\'est pas disponible.');
      this.offers = [];
      this.clients = [];
    }

  }

  // Nombre total de clients actifs
  get totalActiveClients(): number {
    return this.clients.filter(client => client.activeSubscription).length;
  }

  // Chiffre d'affaires mensuel estimé
  get estimatedMonthlyRevenue(): number {
    return this.clients
      .filter(client => client.activeSubscription && client.offreAbonnement)
      .reduce((total, client) => total + (client.offreAbonnement?.monthlyPrice || 0), 0);
  }

  // Exporter les abonnements sur une période donnée
  exportSubscriptions() {
    const filteredClients = this.clients.filter(client => {
      const clientDate = new Date(client. registrationDate);
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      return client. activeSubscription && clientDate >= startDate && clientDate <= endDate;
    });

    if (filteredClients.length === 0) {
      alert('Aucun abonnement trouvé pour la période sélectionnée.');
      return;
    }

    const data = filteredClients.map(client => ({
      ID: client.id,
      Nom: client.lastName,
      Prénom: client.firstName,
      'Date d\'Inscription': client. registrationDate,
      'Offre d\'Abonnement': client.offreAbonnement?. offerName || 'Aucune',
      'Prix Mensuel': client.offreAbonnement?.monthlyPrice || 0
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Abonnements');
    XLSX.writeFile(wb, 'abonnements.xlsx');
  }
}
