import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LigaService } from '../../providers/liga/liga.service';
import { ParticipanteService } from '../../providers/participante/participante.service';
import { EntrarLigaPage } from '../entrar-liga/entrar-liga';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-insert-secret',
  templateUrl: 'insert-secret.html',
})
export class InsertSecretPage {
  
  ligaForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public ligaService: LigaService,
    public participanteService: ParticipanteService ) {

      this.ligaForm = this.formBuilder.group({   
        codigosecreto: ["", Validators.compose([Validators.required])]
      });

  }

  gotoEntrarLiga(){
    let formLiga = this.ligaForm.value;

    this.navCtrl.push(EntrarLigaPage, { 
      'codigosecreto': formLiga.codigosecreto
    })
  }

}
