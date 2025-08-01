import { Component, inject, model, output, signal } from '@angular/core';
import { Centre } from '../../models/centre.model';
import { Router } from '@angular/router';
import { CentreService } from '../../services/centre-service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
export class TableCentreComponent {
  router: Router = inject(Router)
  centreService: CentreService = inject(CentreService)
  centres: Centre[] = []
  displayedColumns: string[] = ['id', 'nom', 'adresse', 'contact', 'specialite', 'action'];
  errer_message: string = ''
  open = output()
  selectedCentre = model<Centre>()

  ngOnInit(): void {
    this.getCentres()
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

}
