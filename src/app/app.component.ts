import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Loading, LoadingController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthService } from '../providers/auth/auth.service';
import { SigninPage } from '../pages/signin/signin';
import { AngularFireList } from 'angularfire2/database';
import { InfoGeraisPage } from '../pages/info-gerais/info-gerais';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;
  user: AngularFireList<any>;

  pages: Array<{title: string, component: any}>;

  constructor(public authService: AuthService, public loadingCtrl: LoadingController, public menu: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Inicio', component: InfoGeraisPage},  
      { title: 'List', component: ListPage },
      { title: 'Selecionar Liga', component: HomePage }
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private showLoading(): Loading{
    let loading: Loading = this.loadingCtrl.create({
      content: 'Saindo...'
    });
  
    loading.present();
  
    return loading;
  }

gotoSelecionarLiga(){
  this.nav.setRoot(HomePage).then(() => this.menu.close());
}
gotoConfig(){
  this.nav.setRoot(ConfiguracoesPage).then(() => this.menu.close());
}

  logout(){

    let loading: Loading = this.showLoading();

    this.authService.logout().then(() => {loading.dismiss().then(() => {this.menu.close()}).then(() => {this.nav.setRoot(SigninPage)})});
  }
}
