import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  usuario:  Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {

      this.usuario = this.userService.listUser().valueChanges();
  }
}
