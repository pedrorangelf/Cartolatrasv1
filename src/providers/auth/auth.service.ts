import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(public auth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, senha:string}) {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.senha);   
  }

  signInWithEmail(user: {email: string, senha: string}){
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.senha); 
  }

  logout(){
    return this.auth.auth.signOut();
  }
}
