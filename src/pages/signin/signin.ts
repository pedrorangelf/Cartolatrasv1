import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth/auth.service';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup

  constructor(public authService: AuthService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public navCtrl: NavController, 
              public navParams: NavParams) {

                let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

                this.signinForm = this.formBuilder.group({                 
                  email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
                  senha: ['', [Validators.required, Validators.minLength(6)]],
                });
  }

logar(){

let loading: Loading = this.showLoading();
  
  this.authService.signInWithEmail(this.signinForm.value).then(() => {loading.dismiss().then(() => {this.navCtrl.setRoot(HomePage)})})
                                                         .catch((error: Error) => { console.log(error);
                                                                                    loading.dismiss();
                                                                                    this.showAlert(error.message);});
                                                         
}

onSignup(){
  this.navCtrl.push(SignupPage);
}


private showLoading(): Loading{
  let loading: Loading = this.loadingCtrl.create({
    content: 'Aguarde...'
  });

  loading.present();

  return loading;
}

private showAlert(message: string){
 this.alertCtrl.create({
   message: message,
   buttons: ['OK']
 }).present();
}


}
