import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { Centre, Specialite } from '../../models/centre.model';
import { Router } from '@angular/router';
import { CentreService } from '../../services/centre-service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SpecialiteService } from '../../services/specialite-service';

const ERROR_MESSAGE_GET_LIST_CENTRE = "Une erreur s'est produite lors de la recuperation des centres"

@Component({
  selector: 'app-table-centre',
  imports: [
    MatTableModule, 
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './table-centre.component.html',
  styleUrl: './table-centre.component.css'
})
export class TableCentreComponent implements OnInit{
  router: Router = inject(Router)
  centreService: CentreService = inject(CentreService)
  centres: Centre[] = []
  displayedColumns: string[] = ['id', 'nom', 'adresse', 'contact', 'specialite', 'action'];
  errer_message: string = ''
  open = output()

  specialiteService: SpecialiteService = inject(SpecialiteService)
  specialitesDisponibles: Specialite[] = []
  selectedCentre = model<Centre>()
  centreForm = model<Centre>(new Centre())
  isAdminTable = input<boolean>(false)

  ngOnInit(): void {
    this.getCentres()
    this.getSpecilaites()
  }

  getSpecilaites() {
    this.specialiteService.getAll().subscribe({
      next: (resultat: any) => {
        if(!Object.keys(resultat).includes('succes')) {
          return
        }

        if(resultat["succes"] === false) {
          return
        }

        if(Object.keys(resultat).includes('specialites')) {
          this.specialitesDisponibles = resultat["specialites"]
          const copy = this.centreForm().copy()
          copy.liste_specialites = this.specialitesDisponibles 
          this.centreForm.set(copy)
        }

      },
      error: err => {
        return
      }
    })
  }

  getCentres(query: string='') {
    this.centreService.getCentres(query).subscribe({
      next: (result: any) => {
        if(!Object.keys(result).includes('succes')) {
          this.errer_message = ERROR_MESSAGE_GET_LIST_CENTRE
          return
        }

        if(result["succes"] === false && Object.keys(result).includes('message')) {
          this.errer_message = result["message"]
          return
        }

        if(Object.keys(result).includes('centres')) {
          this.centres = result["centres"]
        }
      },
      error: errr => {
        this.errer_message = ERROR_MESSAGE_GET_LIST_CENTRE
      }
    })
  }

  onSearchCentre(searchText: string) {
    this.getCentres(searchText)
  }

  openCentre(centre: Centre) {
    this.selectedCentre.set(centre)
    this.open.emit()
  }

  editCentre(centre: Centre) {
    this.centreForm.set(centre)
    //this.open.emit()
  }

  addCentre() {
    let centre = new Centre()
    centre.id = 0
    centre.nom = ''
    centre.adresse = ''
    centre.contact = ''
    centre.liste_specialites = this.specialitesDisponibles
    this.centreForm.set(centre)
    //this.add.emit()
  }

}
