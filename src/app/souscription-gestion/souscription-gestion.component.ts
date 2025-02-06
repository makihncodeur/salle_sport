import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { SouscriptionService } from './souscription.service'; // 🔥 Ajout du service pour la requête API
import { ClientService, Client } from '../client/client.service';
import { OffreService, Offer } from '../offre/offre.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-souscription-gestion',
  templateUrl: './souscription-gestion.component.html',
  styleUrls: ['./souscription-gestion.component.css'],
  providers: [DatePipe]
})
export class SouscriptionGestionComponent implements OnInit {
  clients: Client[] = [];
  offers: Offer[] = [];
  subscriptionForm: FormGroup;
  selectedClient: Client | null = null;
  selectedOffres: Offer[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private offreService: OffreService,
    private souscriptionService: SouscriptionService, // 🔥 Ajout du service pour API
    private datePipe: DatePipe,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.subscriptionForm = this.fb.group({
      clientId: ['', Validators.required],
      offerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.offers = JSON.parse(localStorage.getItem('offers') || '[]');
      this.clients = JSON.parse(localStorage.getItem('clients') || '[]');

      this.loadClients();
      this.loadOffers();
    }
  }

  // 🔹 Charger les clients depuis le backend et les stocker dans localStorage
  loadClients() {
    this.clientService.getClients().subscribe((clients) => {
      // Fusionner les clients du localStorage avec ceux du service
      this.clients = clients.map(client => {
        const savedClient = this.clients.find(c => c.id === client.id);
        return savedClient ? { ...client, ...savedClient } : client;
      });

      // Sauvegarder les clients fusionnés dans le localStorage
      localStorage.setItem('clients', JSON.stringify(this.clients));
    });

  }

  // 🔹 Charger les offres depuis le backend et les stocker dans localStorage
  loadOffers() {
    this.offreService.getOffers().subscribe((offers) => {
      // Fusionner les offres du localStorage avec celles du service
      this.offers = offers.map(offer => {
        const savedOffer = this.offers.find(o => o.id === offer.id);
        return savedOffer ? { ...offer, ...savedOffer } : offer;
      });

      // Sauvegarder les offres fusionnées dans le localStorage
      localStorage.setItem('offers', JSON.stringify(this.offers));
    });

  }

  // 🔹 Souscrire un client à une offre (ENREGISTREMENT DANS LE BACKEND)
  subscribeClient() {
    if (this.subscriptionForm.invalid) {
      console.log("Formulaire invalide !");
      return;
    }

    const customerId = Number(this.subscriptionForm.value.clientId);
    const packId = Number(this.subscriptionForm.value.offerId);

    // 🔥 Envoi des données au backend via le service
    this.souscriptionService.subscribeCustomer(customerId, packId).subscribe((newSubscription) => {
      console.log("✅ Nouvelle souscription enregistrée :", newSubscription);

      // 🔄 Mettre à jour localement les clients
      const client = this.clients.find(c => c.id === customerId);
      if (client) {
        client.activeSubscription = true;
        client.offreAbonnement = this.offers.find(o => o.id === packId);
        localStorage.setItem('clients', JSON.stringify(this.clients));

        console.log(`🔄 Mise à jour du client ${client.id} avec abonnement actif`);
        this.clientService.updateClient(client.id, { ...client, activeSubscription: true }).subscribe(() => {
          console.log("✅ Client mis à jour avec abonnement actif dans le backend !");
        });
      }


      this.subscriptionForm.reset();
    }, error => {
      console.error(" Erreur lors de l'enregistrement de la souscription :", error);
    });
  }
  closeDetails() {
    this.selectedClient = null; // Réinitialiser la sélection du client
  }

  selectClient(client: Client) {
    this.selectedClient = client;
    if (client.offreAbonnement && !this.selectedOffres.some(o => o.id === client.offreAbonnement!.id)) {
      this.selectedOffres.push(client.offreAbonnement);
    }
  }

  // 🔹 Annuler une souscription
  cancelSubscription(clientId: number) {
    const client = this.clients.find(c => c.id === clientId);
    if (client) {
      client.offreAbonnement = undefined;
      client.activeSubscription = false;
      this.selectedClient = null;

      localStorage.setItem('clients', JSON.stringify(this.clients)); // Sauvegarde des changements
    }
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }
}
