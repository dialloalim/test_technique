import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TableCentreComponent } from '../../componets/table-centre/table-centre.component';
import { Router } from '@angular/router';
import { Centre, Specialite } from '../../models/centre.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TableMedecinComponent } from '../../components/table-medecin/table-medecin.component';
import { CentreFormComponent } from '../../components/centre-form/centre-form.component';
import { SpecialiteService } from '../../services/specialite-service';

@Component({
  selector: 'app-admin-page',
  imports: [
    MatTabsModule,
    TableCentreComponent,
    MatCardModule, 
    MatDividerModule, 
    TableMedecinComponent,
    CentreFormComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{
  
  router: Router = inject(Router)
  specialiteService: SpecialiteService = inject(SpecialiteService)
  selectedCentre = model<Centre>(new Centre())
  centreForm = model<Centre>(new Centre())
  specialitesDisponibles: Specialite[] = []
  centreId = computed(() => {
    return this.selectedCentre()?.id!
  })

  ngOnInit(): void {
    
  }
  
  openCentre() {
    
  }

}
