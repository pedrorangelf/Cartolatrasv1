import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  Loading
} from "ionic-angular";
import { LigaService } from "../../providers/liga/liga.service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ParticipanteService } from "../../providers/participante/participante.service";
import { Observable } from "rxjs/Observable";
import { Participante } from "../../models/participante.model";
import { LigaDetailPage } from '../liga-detail/liga-detail';

@Component({
  selector: "page-entrar-liga",
  templateUrl: "entrar-liga.html"
})
export class EntrarLigaPage {
  codigosecreto: string;
  nomeliga: string;
  liga: Observable<any>;
  ligaForm: FormGroup;
  public static codigo: string;

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
      apelido: ["", Validators.compose([Validators.required])]
    });
    let codigosecreto = this.navParams.get("codigosecreto");
    this.codigosecreto = codigosecreto;

    this.liga = this.ligaService.listbyCodFirst(codigosecreto).valueChanges();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "ENTRANDO..."
    });

    loading.present();

    return loading;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Você entrou em " + this.nomeliga,
      duration: 5000,
      position: "top"
    });
    this.navCtrl.setRoot(LigaDetailPage, {
      'liga': this.codigosecreto
    });
    toast.present();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        message: message,
        buttons: ["OK"]
      })
      .present();
  }

  entrarLiga(apelido) {
    let loading: Loading = this.showLoading();
    let formLiga = this.ligaForm.value;

    this.nomeliga = document.getElementById("nomeliga").innerText;
    let participante: Participante = new Participante(
      this.participanteService.af.createPushId(),
      formLiga.apelido,
      0,
      this.nomeliga,
      this.participanteService.authService.auth.auth.currentUser.uid,
      this.codigosecreto
    );

     this.participanteService.create(participante).then(() => loading.dismiss().then(() => { this.presentToast();})
                                          ).catch((error: Error) => {
                                            loading.dismiss();
                                            this.showAlert(error.message);
                                          });
  }
}
