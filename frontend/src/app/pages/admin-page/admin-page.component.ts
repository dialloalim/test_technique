import { Component, computed, inject, model, signal } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TableCentreComponent } from '../../componets/table-centre/table-centre.component';
import { Router } from '@angular/router';
import { Centre } from '../../models/centre.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TableMedecinComponent } from '../../components/table-medecin/table-medecin.component';

@Component({
  selector: 'app-admin-page',
  imports: [
    MatTabsModule,
    TableCentreComponent,
    MatCardModule, 
    MatDividerModule, 
    TableMedecinComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  router: Router = inject(Router)
  selectedCentre = model<Centre>()
  centreId = computed(() => {
    return this.selectedCentre()?.id!
  })
  
  openCentre() {
    
  }
}
