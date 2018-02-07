import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PontuarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pontuar',
  templateUrl: 'pontuar.html',
})
export class PontuarPage {

  public qtdeBeijin: number = 0;
  public rBebeu: number = 5;
  public rPegou: number = 10;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 pontuar(){
   var check = document.getElementById("teste");

   console.log(check);
   

 }

 datachanged(e:any){
  console.log(e);
  console.log(e.checked);

  if(e.checked == true)
  {
    console.log("BEIJIN: " + this.qtdeBeijin);
    console.log("EH TRUE");
  }
}

addBeijin(e){
  this.qtdeBeijin++
}

removeBeijin(e){
  this.qtdeBeijin--
}

}
