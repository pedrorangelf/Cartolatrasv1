import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth/auth.service';
import { Liga } from '../../models/liga.model';

@Injectable()
export class LigaService {

  constructor(public af: AngularFireDatabase, public authService: AuthService ) {
    
  }

listbyuser(){
 return this.af.list('/participantes', ref => ref.orderByChild('userid').equalTo(this.authService.auth.auth.currentUser.uid));
}

listbyCodFirst(cod){
  return this.af.object('/ligas/'+ cod);
}

listLigasPorUsuarioLogado(){
  return this.af.list('/ligas/'+ this.authService.auth.auth.currentUser.uid);
}

create(liga: Liga){
  return this.af.object('/ligas/' + liga.id)  
                .set(liga);
}

}
