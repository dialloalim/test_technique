import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Centre, Medecin, Specialite } from '../../models/centre.model';
import { CentreService } from '../../services/centre-service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SpecialiteService } from '../../services/specialite-service';
import { TableMedecinComponent } from '../../components/table-medecin/table-medecin.component';


const ERROR_MESSAGE_GET_LIST_MEDECINS = "Une erreur s'est produite lors de la recuperation des medecins"

@Component({
  selector: 'app-medecin',
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatDividerModule, 
    MatSelectModule,
    MatFormFieldModule,
    TableMedecinComponent
  ],
  templateUrl: './medecin.component.html',
  styleUrl: './medecin.component.css'
})
export class MedecinComponent implements OnInit{
  
  private route = inject(ActivatedRoute) 
  private router = inject(Router)
  centreService = inject(CentreService)
  centreId = signal<number>(0) 
  selectedSpecialite = signal<number>(0)
  medecins: Medecin[] = []
  selectedMedecin = model<Medecin>();
  displayedColumns: string[] = ['id', 'nom', 'specialite', 'action'];
  error_message: string = ''
  centre = model<Centre>(new Centre());

  ngOnInit(): void {
    this.route.params.subscribe((params => {
      if(/^[0-9]+$/.test(params["id"])) {
        this.centreId.set(parseInt(params["id"]))
        this.getCentre(parseInt(params["id"]))
      } else {
        window.history.back();
      }
      
    }))
  }


  getCentre(centreId: number) {
    this.centreService.getById(centreId).subscribe({
      next: (resultat: any) => {
        if(!Object.keys(resultat).includes('succes')) {
          this.error_message = ERROR_MESSAGE_GET_LIST_MEDECINS
          return
        }

        if(resultat["succes"] === false && Object.keys(resultat).includes('message')) {
          this.error_message = resultat["message"]
          return
        }

        if(Object.keys(resultat).includes('centre')) {
          this.centre.set(resultat["centre"])
        }

      },
      error: err => {
        this.error_message = ERROR_MESSAGE_GET_LIST_MEDECINS
      }
    })
  }

  choixMedecin(medecin: Medecin) {
    //this.selectedMedecin = medecin
  }

}
