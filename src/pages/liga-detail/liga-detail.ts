import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
idParticipante: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public ligaService: LigaService, 
              public alertCtrl: AlertController,
              public participanteService: ParticipanteService) {
    
    let liga = this.navParams.get('liga');
    this.liga = liga;

    this.participantes  = this.participanteService.buscaParticipantes(liga).valueChanges();
    this.participanteService.buscaParticipantes(this.liga).snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        if(action.payload.child('userid').val() == this.participanteService.authService.auth.auth.currentUser.uid){
          this.idParticipante = action.payload.child('id').val();
        }
      });
  });

  }

gotoPontuar(){
  this.navCtrl.push(PontuarPage, {
    'idParticipante': this.idParticipante
  });
}


  gotoPerfil(){
    this.navCtrl.setRoot(InfoGeraisPage, {
      'liga': this.liga
    });
  }

  // removeLiga(){
  //   let alert = this.alertCtrl.create({ 
  //     message: "Deseja APAGAR essa Liga ?", 
  //     buttons: [ { text: 'Apagar',
  //                  cssClass: 'danger',
  //     handler: data => { this.participanteService.remover(this.liga).then(() => this.ligaService.remover(this.liga))
  //                                          .then(evento => {this.navCtrl.push(HomePage);}) 
  //                       }
  //                 } ,
  //                 { text: 'Cancelar', }              
  //             ] 
  //   }); 
    
  //   alert.present(); 
  // }


}
