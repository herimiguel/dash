
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {};
  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.currentUser();
    console.log("check this out!!");
    console.log(this.user);
  }

  currentUser(){
    this._userService.grabUser().then(user => this.user = user).catch(err => console.log(err));
  }

  logoutUser(){
    this._userService.logout().then(response => {this._router.navigateByUrl('/');}).catch(err => console.log(err));
  }

}
