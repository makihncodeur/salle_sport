import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService, Client } from './client.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [DatePipe]
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  clientForm: FormGroup;
  searchTerm: string = '';
  isEditing: boolean = false;
  currentClientId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private datePipe: DatePipe)
     {
    this.clientForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      registrationDate: [new Date(), Validators.required],
      phoneNumber:['',  [Validators.required, Validators.pattern(/^\d+$/)]],
      activeSubscription: [false]
    });
  }

  ngOnInit(): void {

    this.loadClients();


  }

  loadClients() {
    this.clientService.getClients().subscribe((clients) => {
      console.log("🔄 Clients chargés :", clients);
      this.clients = clients;

     });

}
  get filteredClients() {
    return this.clients.filter(client =>
      client.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addOrUpdateClient() {
    if (this.clientForm.invalid) {
      console.log("Formulaire invalide !");
      return;
    }
    let registrationDate = this.clientForm.value.registrationDate;
    if (typeof registrationDate === 'string') {
        registrationDate = new Date(registrationDate);
    }
    const formattedRegistrationDate = registrationDate.toISOString().split('T')[0];

    const newClient: Client = {
      id: this.currentClientId ?? 0,
      lastName: this.clientForm.value.lastName,
      firstName: this.clientForm.value.firstName,
      registrationDate: formattedRegistrationDate,
      phoneNumber: this.clientForm.value.phoneNumber,
      activeSubscription: this.clientForm.value. activeSubscription
    };
    console.log("Données envoyées au backend :", newClient);
    if (this.isEditing && this.currentClientId !== null) {
      this.clientService.updateClient(this.currentClientId, newClient).subscribe(() => {
        this.loadClients();
        this.resetForm();
      });
    } else {
      this.clientService.addClient(newClient).subscribe(() => {
        this.loadClients();
        this.resetForm();
      });
    }

  }

  editClient(client: Client) {
    this.isEditing = true;
    this.currentClientId = client.id;
    this.clientForm.patchValue({
      ...client,

      registrationDate: new Date(client.registrationDate) // Convertir la chaîne en objet Date
    });
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.loadClients();
    });
  }

  resetForm() {
    this.clientForm.reset({ activeSubscription: false });
    this.isEditing = false;
    this.currentClientId = null;
  }
  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';  // Retourne la date formatée ou une chaîne vide
  }
}
