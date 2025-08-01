export class Specialite {
    id: number = -1
    nom: string = "Specialite 1"
    
    copy() {
        return Object.assign(new Specialite, this)
    }
}

export class Centre {
    id: number = 0
    nom: string = "Centre 1"
    adresse: string = "kipe"
    contact: string = "621999999"
    liste_specialites: Specialite[]  = []
    
    copy() {
        return Object.assign(new Centre, this)
    }
}


export class Medecin {
    id: number = -1
    nom: string = "Centre 1"
    specialite: Specialite = new Specialite()
    
    copy() {
        return Object.assign(new Medecin, this)
    }
}