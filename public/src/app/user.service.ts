import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  retrieveUser(){
    return this._http.get('/api/give').map(data => data.json()).toPromise();
  }

  sendUser(user){
    return this._http.post('/api/create', user).map(data => data.json()).toPromise();
  }
 
  login(user){
    return this._http.post('/api/login', user).map(data => data.json()).toPromise();
  }

  grabUser(){
    return this._http.get('/api/account').map(data => data.json()).toPromise();
  }

  logout(){
    return this._http.get('/api/logout').map(data => data.json()).toPromise();
  }

}
