import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffreService, Offer } from './offre.service';


@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offers: Offer[] = [];
  offerForm: FormGroup;
  isEditing: boolean = false;
  currentOfferId: number | null = null;

  constructor(private fb: FormBuilder,private offreService: OffreService) {
    this.offerForm = this.fb.group({
      offerName: ['', Validators.required],
      durationMonths : ['', [Validators.required, Validators.min(1)]],
      monthlyPrice: ['', [Validators.required, Validators.min(0)]]
    });

  }


  ngOnInit(): void {
    this.loadOffers();


  }
  loadOffers() {
    this.offreService.getOffers().subscribe({
      next: data => {
        this.offers = data
    },
    error: err =>{
      console.log(err);
    }

    })
  }

  addOrUpdateOffer() {
    if (this.offerForm.invalid) {
      console.log("Formulaire invalide !");
      return;

    }

    const newOffer: Offer = {
      id: this.currentOfferId ?? 0,
      offerName: this.offerForm.value.offerName,
      durationMonths: this.offerForm.value.durationMonths,
      monthlyPrice: this.offerForm.value.monthlyPrice
    };
    console.log("Données envoyées au backend :", newOffer);
    if (this.isEditing && this.currentOfferId !== null) {
      this.offreService.updateOffer(this.currentOfferId, newOffer).subscribe(() => {
        this.loadOffers();
        this.resetForm();
      });
    } else {
      this.offreService.addOffer(newOffer).subscribe(() => {
        this.loadOffers();
        this.resetForm();
      });
    }

  }

  editOffer(offer: Offer) {
    this.isEditing = true;
    this.currentOfferId = offer.id ??null;
    this.offerForm.patchValue({
      offerName: offer.offerName,
  durationMonths: offer.durationMonths,
  monthlyPrice: offer.monthlyPrice
    });
  }

  deleteOffer(id: number) {
    this.offreService.deleteOffer(id).subscribe(() => {
      this.loadOffers();
    });
  }

  resetForm() {
    this.offerForm.reset();
    this.isEditing = false;
    this.currentOfferId = null;
  }

}
