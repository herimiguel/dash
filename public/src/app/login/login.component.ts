import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  users;
  login;
  exists = false;  
  user = new User();
  registered = false;
  passWordError = false;
  emailError = false;
  onlyPassWord = false;


  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(){
    this.getUsers();
    this.login = {email: '', password:''}
  }

  getUsers(){
    this._userService.retrieveUser().then(users => this.users = users).catch(err => console.log(err));
  }

  createUser() {
    this.exists =false;
    for(let i in this.users){
      if(this.user[i].email == this.user.email){
        this.exists = true;
        this.user = new User();
        console.log(this.user);
      }
    }

    if(!this.exists){
      this._userService.sendUser(this.user).then(response => {this._router.navigateByUrl('/dashboard');}).catch(err => console.log(err));
      this.user = new User();
      this.getUsers();
    }
  }

  loginUser(){
    this.registered = false;
    this.passWordError= false;
    this.emailError = false;
    this.onlyPassWord = false;
    for(let i in this.users){
      if(this.users[i].email == this.login.email){
        if(this.user[i].password == this.login.password){
          this.registered = true;
        } else{
          this.passWordError = true;
          this.onlyPassWord = true;
        }
      }
    }
    if(this.registered){
      this._userService.login(this.login).then(response => {
        this._router.navigateByUrl('/dashboard');}).catch(err => console.log(err));
    } else if(this.onlyPassWord){
        this.emailError = false;
    }else {
      this.emailError = true;
    }
  }



}
