import { Injectable } from '@angular/core';
import { Specialite } from '../models/centre.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  specialites: Specialite[] = []
  constructor() { 
    let s = new Specialite()
    s.id = 1
    s.nom = "Neurologie"

    let s2 = new Specialite()
    s2.id = 2
    s2.nom = "Specialie 1"

    let s3 = new Specialite()
    s3.id = 2
    s3.nom = "Specialie 2"

    let s4 = new Specialite()
    s4.id = 2
    s4.nom = "Specialie 3"

    this.specialites = [s, s4, s2, s3]
  }

  getAll(): Specialite[] {
    return this.specialites
  }
}
