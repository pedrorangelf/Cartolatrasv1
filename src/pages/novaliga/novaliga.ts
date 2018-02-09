import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  Loading,
  LoadingController,
  ToastController
} from "ionic-angular";
import { AlertController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LigaService } from "../../providers/liga/liga.service";
import { ParticipanteService } from '../../providers/participante/participante.service';
import { Participante } from '../../models/participante.model';
import { Liga } from "../../models/liga.model";

@Component({
  selector: "page-novaliga",
  templateUrl: "novaliga.html"
})
export class NovaligaPage {

  ligaForm: FormGroup;
  today = new Date();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public ligaService: LigaService,
    public participanteService: ParticipanteService 
  ) {
    this.ligaForm = this.formBuilder.group({
      nome: ["", Validators.compose([Validators.required])],
      apelido: ["", Validators.compose([Validators.required])],
      codigosecreto: [{value:ligaService.af.createPushId(), disabled: true}, [Validators.required, Validators.minLength(6)]]
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Liga Criada com sucesso aspira.",
      duration: 5000,
      position: "top"
    });
    this.navCtrl.pop();
    toast.present();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        message: message,
        buttons: ["OK"]
      })
      .present();
  }

  criarLiga() {
    let loading: Loading = this.showLoading();
    let formLiga = this.ligaForm.value;
    let codigosecreto = this.ligaService.af.createPushId()
    let participante: Participante = new Participante(this.participanteService.af.createPushId(), 
                                                      formLiga.apelido, 
                                                      0, 
                                                      formLiga.nome,
                                                      this.participanteService.authService.auth.auth.currentUser.uid,
                                                      codigosecreto);

    let liga: Liga = new Liga(codigosecreto, 
                              Date.now(), 
                              codigosecreto, 
                              // "", 
                              formLiga.nome);      
                              
 
   this.ligaService.create(liga).then(() => this.participanteService.create(participante).then(() => loading.dismiss().then(() => { this.presentToast();}
                                                                      )
                                          ).catch((error: Error) => {
                                            loading.dismiss();
                                            this.showAlert(error.message);
                                          }));
  }
}
