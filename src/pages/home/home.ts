import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NovaligaPage } from '../novaliga/novaliga';

import { Observable } from 'rxjs/Observable';
import { LigaService } from '../../providers/liga/liga.service';
import { LigaDetailPage } from '../liga-detail/liga-detail';
import { EntrarLigaPage } from '../entrar-liga/entrar-liga';
import { InsertSecretPage } from '../insert-secret/insert-secret';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

ligas: Observable<any[]>

  constructor(public navCtrl: NavController, public ligaService: LigaService) {
    this.ligas = ligaService.listbyuser().valueChanges();
  }

gotoNovaLiga(){
  this.navCtrl.push(NovaligaPage);
}

gotoEntrarLiga(){
  this.navCtrl.push(InsertSecretPage);
}

getLigaDetail(liga){
  this.navCtrl.setRoot(LigaDetailPage, {
    'liga': liga.codigosecreto
  });
}

}
