import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from "ionic-angular";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LigaService } from "../../providers/liga/liga.service";
import { ParticipanteService } from "../../providers/participante/participante.service";
import { EntrarLigaPage } from "../entrar-liga/entrar-liga";

@Component({
  selector: "page-insert-secret",
  templateUrl: "insert-secret.html"
})
export class InsertSecretPage {
  ligaForm: FormGroup;
  public participante: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public ligaService: LigaService,
    public toastCtrl: ToastController,
    public participanteService: ParticipanteService
  ) {
    this.ligaForm = this.formBuilder.group({
      codigosecreto: ["", Validators.compose([Validators.required])]
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Você já está nessa liga.",
      duration: 4000,
      position: "top"
    });
    this.navCtrl.pop();
    toast.present();
  }

  gotoEntrarLiga() {
    let formLiga = this.ligaForm.value;

    this.participanteService
      .buscaParticipantes(formLiga.codigosecreto)
      .snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          if (action.payload.child('userid').val() == this.participanteService.authService.auth.auth.currentUser.uid) {
              this.presentToast(); 
          }
        });
      });
         
        this.navCtrl.push(EntrarLigaPage, {
          codigosecreto: formLiga.codigosecreto
        });
  }
}
