import { Component, effect, inject, input, Input, model, OnInit, Output, output, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentreService } from '../../services/centre-service';
import { Centre, Medecin } from '../../models/centre.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const ERROR_MESSAGE_GET_LIST_MEDECINS = "Une erreur s'est produite lors de la recuperation des medecins"

@Component({
  selector: 'app-table-medecin',
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatDividerModule, 
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './table-medecin.component.html',
  styleUrl: './table-medecin.component.css'
})
export class TableMedecinComponent implements OnInit{
  private route = inject(ActivatedRoute) 
  centreService = inject(CentreService)
  selectedSpecialite = model<number>(0)
  medecins: Medecin[] = []
  centre = input<Centre>();
  private _centreId!: number;
  @Input() 
  set centreId(value: number) {
    if (value !== this._centreId) {
      this._centreId = value;
      this.getMedecins();  // recharge les médecins dès que le centre change
    }
  }
  get centreId(): number {
    return this._centreId;
  }
  
  open = output()
  selectedMedecin = model<Medecin>();
  displayedColumns: string[] = ['id', 'nom', 'specialite', 'action'];
  error_message: string = ''
  

  ngOnInit(): void {
    this.getMedecins()
    
  }

  getMedecins() {
    this.centreService.getMedecins(this.centreId, this.selectedSpecialite()).subscribe({
      next: (resultat: any) => {
        
        console.log(this.centreId)
        if(!Object.keys(resultat).includes('succes')) {
          this.error_message = ERROR_MESSAGE_GET_LIST_MEDECINS
          return
        }

        if(resultat["succes"] === false && Object.keys(resultat).includes('message')) {
          this.error_message = resultat["message"]
          return
        }

        if(Object.keys(resultat).includes('medecins')) {
          this.medecins = resultat["medecins"]
        }

      },
      error: err => {
        this.error_message = ERROR_MESSAGE_GET_LIST_MEDECINS
      }
    })
  }

  onSpecialiteSelected(specialiteId: number) {
    this.selectedSpecialite.set(specialiteId)
    this.getMedecins()
  }

  openMedecin(medecin: Medecin) {
    
    this.selectedMedecin.set(medecin)
    //this.open.emit()
    console.log(medecin)
  }
 
}
