import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user.service';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

signupForm: FormGroup

  constructor(public authService: AuthService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public userService: UserService,
              public toastCtrl: ToastController) {

      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        senha: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário cadastrado com sucesso.',
      duration: 4000,
      position: 'top'
    });
    this.navCtrl.pop();
    toast.present();
  }

criarConta()
{
  let loading: Loading = this.showLoading();
  let formUser = this.signupForm.value;

    this.authService.createAuthUser({
      email: formUser.email,
      senha: formUser.senha
    }).then( newUser => { delete formUser.senha;
                          formUser.uid = this.authService.auth.auth.currentUser.uid;
                          this.userService.create(formUser).then(()=> loading.dismiss()
                                                                             .then(() => { this.presentToast(); },
                                                                                   error => { console.log(error); }
                                                                                  )
                                                                ).catch((error: Error) => {
                                                                  console.log(error);
                                                                  loading.dismiss();
                                                                  this.showAlert(error.message);
                                                                });
                        }
            ).catch((error: Error) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error.message);
            });
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
