import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';
import { Participante } from '../../models/participante.model';

@Injectable()
export class ParticipanteService {

  constructor(public af: AngularFireDatabase, public authService: AuthService) {
    
  }


  create(participante: Participante)
  {
    return this.af.object('/participantes/' + participante.id).set(participante);
  }

  buscaParticipantes(ligaid){
    return this.af.list('/participantes', ref => ref.orderByChild('codigosecreto').equalTo(ligaid));
  }


}
