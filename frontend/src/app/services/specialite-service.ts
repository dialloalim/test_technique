import { inject, Injectable } from '@angular/core';
import { Specialite } from '../models/centre.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  http: HttpClient = inject(HttpClient)
  BASE_URL = "http://127.0.0.1:8000/";
  errorMessage = "Une erreur s'est produite lors de la recuperation des specialites"

  constructor() { 
    
  }

  getAll() {
    return this.http.get(`${this.BASE_URL}api/specialites/`)
  }
}
