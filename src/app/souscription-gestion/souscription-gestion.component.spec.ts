import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionGestionComponent } from './souscription-gestion.component';

describe('SouscriptionGestionComponent', () => {
  let component: SouscriptionGestionComponent;
  let fixture: ComponentFixture<SouscriptionGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SouscriptionGestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouscriptionGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
