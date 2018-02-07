
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  constructor( public af: AngularFireDatabase, public authService: AuthService) {
   
  }

  create(user: User){
    return this.af.object('/users/' + user.uid)
                  .set(user);
  }

  listUser(){
    return this.af.object('/users/' + this.authService.auth.auth.currentUser.uid);
  }
}
