import { inject, Injectable } from '@angular/core';
import { Centre } from '../models/centre.model';
import { SpecialiteService } from './specialite-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CentreService {
  centres: Centre[] = []
  specialiteService = inject(SpecialiteService)
  http: HttpClient = inject(HttpClient)
  BASE_URL = "http://127.0.0.1:8000/";
  errorMessage = "Une erreur s'est produite lors de la recuperation des centres"

  constructor() { 
   
  }

  getCentres(query: string='') {
    let url = `${this.BASE_URL}api/centres/`
    if(query.length > 0) {
      url += `?query=${query}`
    }
    return this.http.get(url)
  }

  getById(centreId: number) {
    return this.http.get(`${this.BASE_URL}api/centres/${centreId}/`)
  }

  post(centre: Centre) {
    let data = {...centre, ...{specialites: centre.liste_specialites}}
    if(centre.id === 0) {
      return this.http.post(`${this.BASE_URL}api/centres/`, data)
    } else {
      return this.http.post(`${this.BASE_URL}api/centres/${centre.id}/update/`, data)
    }
  }

  getSpecialites(centreId: number) {
    return this.http.get(`${this.BASE_URL}api/centres/${centreId}/specialites/`)
  }

  getMedecins(centreId: number, specialiteId: number=0) {
    let url = `${this.BASE_URL}api/centres/${centreId}/medecins/`
    if(specialiteId != 0) {
      url += `?specialite_id=${specialiteId}`
    }
    return this.http.get(url) 
  }
}
