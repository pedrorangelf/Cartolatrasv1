import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  Loading,
  LoadingController,
  AlertController
} from "ionic-angular";
import { ParticipanteService } from "../../providers/participante/participante.service";
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: "page-pontuar",
  templateUrl: "pontuar.html"
})
export class PontuarPage {
  public pontos: any = {
    cBebeu: false,
    cRole: false,
    cPegouA: false,
    cPegouB: false,
    cPreliminar: false,
    cAnfitriao: false,
    cPete: false,
    cSexo: false,
    cShot: false
  };

  totalPontos: any;
  public rShot: number = 1;
  public rBebeu: number = 3;
  public rRole: number = 5;
  public rPegouA: number = 10;
  public rPegouB: number = 5;
  public rAnfitriao: number = 5;
  public rSexo: number = 15;
  public qtderPegouA: number = 0;
  public qtderPegouB: number = 0;
  public qtderSexo: number = 0;
  public qtderShot: number = 0;
  
  idParticipante: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public participanteService: ParticipanteService
  ) {
    this.idParticipante = this.navParams.get("idParticipante");

    this.participanteService.buscarParticipanteById(this.idParticipante).snapshotChanges().subscribe(action => {
       this.totalPontos = action.payload.child('pontos').val();
      });



  }

  presentToast(pontos) {
    let toast = this.toastCtrl.create({
      message: "Parabéns Retardado !",
      duration: 4000,
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

  pontuar(pontos) {
    let loading: Loading = this.showLoading();
    let total: number = this.totalPontos;

    if (pontos.cBebeu) {
      total = total + this.rBebeu;
    }
    if (pontos.cRole) {
      total = total + this.rRole;
    }
    if (pontos.cAnfitriao) {
      total = total + this.rAnfitriao;
    }
    if (pontos.cPegouB) {
      total = total + this.rPegouB * this.qtderPegouB;
    }
    if (pontos.cSexo) {
      total = total + this.rSexo * this.qtderSexo;
    }
    if (pontos.cShot) {
      total = total + this.rShot * this.qtderShot;
    }
    if(pontos.cPete){
      total = 0;
    }

    this.participanteService
      .pontuar(total, this.idParticipante)
      .then(() =>
        loading.dismiss().then(
          () => {
            this.presentToast(total);
          }
        )
      )
      .catch((error: Error) => {
        loading.dismiss();
        this.showAlert(error.message);
      });
  }

  //  datachanged(e:any){
  //   console.log(e);
  //   console.log(e.checked);

  //   if(e.checked == true)
  //   {
  //     console.log("BEIJIN: " + this.qtdeBeijin);
  //     console.log("EH TRUE");
  //   }
  // }

  // rPegou
  addrPegouA(e) {
    this.qtderPegouA++;
  }

  removerPegouA(e) {
    this.qtderPegouA--;
  }

  addrPegouB(e) {
    this.qtderPegouB++;
  }

  removerPegouB(e) {
    this.qtderPegouB--;
  }

  addrSexo(e) {
    this.qtderSexo++;
  }

  removerSexo(e) {
    this.qtderSexo--;
  }


  addrShot(e) {
    this.qtderShot++;
  }

  removerShot(e) {
    this.qtderShot--;
  }
}

