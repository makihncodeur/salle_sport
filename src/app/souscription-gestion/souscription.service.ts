import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Subscription {
  id?: number;
  customerId: number; // 🔥 Correction ici
  packId: number; // 🔥 Correction ici
  startDate?: string;
  endDate?: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SouscriptionService {
  private apiUrl = 'http://localhost:8080/api/suscriptions'; // Modifier selon ton backend

  constructor(private http: HttpClient) {}

  getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/list`);
  }

  subscribeCustomer(customerId: number, packId: number): Observable<Subscription> { // 🔥 Correction ici
    return this.http.post<Subscription>(`${this.apiUrl}/subscribe/${customerId}/${packId}`, {});
  }

  // 🔹 Récupérer les abonnements d’un client
  getSubscriptions(customerId: number): Observable<Subscription[]> { // 🔥 Correction ici
    return this.http.get<Subscription[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  // 🔹 Résilier un abonnement
  cancelSubscription(subscriptionId: number): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/cancel/${subscriptionId}`, {});
  }
}
