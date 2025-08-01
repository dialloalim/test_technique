import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Centre, Specialite } from '../../models/centre.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CentreService } from '../../services/centre-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-centre-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './centre-form.component.html',
  styleUrls: ['./centre-form.component.css']
})
export class CentreFormComponent implements OnInit {
  @Input() centre: Centre = new Centre();
  centreService = inject(CentreService)
  error_message = ''

  centreForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.centreForm) {
      this.updateForm();
    }
  }

  private initForm(): void {
    this.centreForm = this.fb.group({
      nom: [this.centre.nom, [Validators.required, Validators.maxLength(100)]],
      adresse: [this.centre.adresse, [Validators.required, Validators.maxLength(200)]],
      contact: [this.centre.contact, [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      liste_specialites: [this.centre.liste_specialites.map(s => s.id), Validators.required]
    });
  }

  private updateForm(): void {
    this.centreForm.patchValue({
      nom: this.centre.nom,
      adresse: this.centre.adresse,
      contact: this.centre.contact,
      liste_specialites: this.centre.liste_specialites.map(s => s.id)
    });
  }

  onSubmit(): void {
    if (this.centreForm.valid) {
      const formValue = this.centreForm.value;
      const updatedCentre = new Centre() 
      
      updatedCentre.id = this.centre.id
      updatedCentre.nom = formValue.nom;
      updatedCentre.adresse = formValue.adresse;
      updatedCentre.contact = formValue.contact;
      updatedCentre.liste_specialites = formValue.liste_specialites;

      this.centreService.post(updatedCentre).subscribe({
        next: (resultat: any) => {
          console.log(resultat)
          if(Object.keys(resultat).includes('succes') && resultat["succes"] === true) {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: resultat["message"],
              confirmButtonText: 'OK'
            }).then(() => {
             
              window.location.reload();
            });
          } else {
            this.error_message = resultat['message']
          }
          
        },
        error: err => {
          console.log(err)
        }
      })
      
    }
  }
}