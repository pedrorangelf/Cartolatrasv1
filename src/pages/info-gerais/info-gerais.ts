import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-info-gerais',
  templateUrl: 'info-gerais.html',
})
export class InfoGeraisPage {

liga: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let liga = this.navParams.get('liga');
    this.liga = liga;

  }


}
