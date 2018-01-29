
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user.model';

@Injectable()
export class UserService {

  constructor( public af: AngularFireDatabase) {
   
  }

  create(user: User){
    return this.af.object('/users/' + user.uid)
                  .set(user);
  }
}
