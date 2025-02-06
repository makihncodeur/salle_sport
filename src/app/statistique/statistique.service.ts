import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  lastName: string;
  firstName: string;
  registrationDate: string;
  phoneNumber: number;
  activeSubscription: boolean;
  offreAbonnement?: Offer;
}

export interface Offer {
  id: number;
  offerName: string;
  durationMonths: number;
  monthlyPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private apiUrl = 'http://localhost:8080/api/customers'; // 🔥 API Backend

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/list`);
  }
}
