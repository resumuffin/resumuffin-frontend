import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private http: HttpClient) { }

  springURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/getUserDetails/";
  userName = "";

  ngOnInit() {
    var name = this.userService.getName();
    var nameURL = this.springURL + name;
    this.http.get<any>(nameURL).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.userName = name;
  }

}
