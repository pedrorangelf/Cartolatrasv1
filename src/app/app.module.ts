import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment} from '../environments/environment';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../providers/user/user.service';
import { AuthService } from '../providers/auth/auth.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { LigaService } from '../providers/liga/liga.service';
import { NovaligaPage } from '../pages/novaliga/novaliga';
import { LigaDetailPage } from '../pages/liga-detail/liga-detail';
import { ParticipanteService } from '../providers/participante/participante.service';
import { EntrarLigaPage } from '../pages/entrar-liga/entrar-liga';
import { InsertSecretPage } from '../pages/insert-secret/insert-secret';
import { InfoGeraisPage } from '../pages/info-gerais/info-gerais';
import { PontuarPage } from '../pages/pontuar/pontuar';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    NovaligaPage,
    LigaDetailPage,
    EntrarLigaPage,
    InsertSecretPage,
    InfoGeraisPage,
    PontuarPage,
    ConfiguracoesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    NovaligaPage,
    LigaDetailPage,
    EntrarLigaPage,
    InsertSecretPage,
    InfoGeraisPage,
    PontuarPage,
    ConfiguracoesPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    UserService, 
    LigaService, 
    ParticipanteService, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}  
  ]
})
export class AppModule {}
