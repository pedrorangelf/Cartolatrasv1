import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the PontuarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    cAnfitriao: false
  }; 
  public rBebeu: number = 5;
  public rPegouA: number = 10;
  public rPegouB: number = 5;
  public qtderPegouA: number = 0;
  public qtderPegouB: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  pontuar(pontos) {
    let total: number = 0;

    if (pontos.cBebeu) {
      total = total + this.rBebeu;
    }
    if (pontos.cPegouA) {
      total = total + (this.rPegouA * this.qtderPegouA);
    }
    if (pontos.cPegouB) {
      total = total + (this.rPegouB * this.qtderPegouB);
    }
    if (pontos.cPegouB) {
      total = total + (this.rPegouB * this.qtderPegouB);
    }
    
    console.log(total);
    console.log(new Date().toLocaleDateString());
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
}
