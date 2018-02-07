import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';
import { LigaService } from '../../providers/liga/liga.service';
import { Observable } from 'rxjs/Observable';
import { ParticipanteService } from '../../providers/participante/participante.service';
import { InfoGeraisPage } from '../info-gerais/info-gerais';
import { PontuarPage } from '../pontuar/pontuar';

@Component({
  selector: 'page-liga-detail',
  templateUrl: 'liga-detail.html',
})
export class LigaDetailPage {

liga: AngularFireList<any>;
participantes: Observable<any[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public ligaService: LigaService, 
              public participanteService: ParticipanteService) {
    
    let liga = this.navParams.get('liga');
    this.liga = liga;

    console.log(liga);

    this.participantes  = this.participanteService.buscaParticipantes(liga).valueChanges();

  }

gotoPontuar(){
  this.navCtrl.push(PontuarPage);
}


  gotoPerfil(){
    this.navCtrl.setRoot(InfoGeraisPage, {
      'liga': this.liga
    });
  }


}
