import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientComponent } from './client/client.component';
import { OffreComponent } from './offre/offre.component';
import { SouscriptionGestionComponent } from './souscription-gestion/souscription-gestion.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthComponent } from './auth/auth.component';

import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ Plus besoin de HttpClientModule
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientComponent,
    OffreComponent,
    SouscriptionGestionComponent,
    StatistiqueComponent,
    SidebarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()) // ✅ Fournit HttpClient sans HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
