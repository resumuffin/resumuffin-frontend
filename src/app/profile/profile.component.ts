import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import {HttpClient } from '@angular/common/http';
import { ResumeService } from '../resume-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private resumeService: ResumeService, private http: HttpClient, private router: Router) { }

  springURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/getUserDetailsByName/";
  userName = "";
  email;
  role;
  threads;

  ngOnInit() {
    this.userService.getThreads().subscribe(data => {
      this.threads = data;
      console.log(this.threads);
    })
    var name = localStorage.getItem("USERNAME");
    var nameURL = this.springURL + name;
    this.http.get<any>(nameURL).subscribe(
      data  => {
        this.email = data.email;
        this.role = data.role.name;
        this.setUpPage();
        }
    );
    this.userName = name;
  }

  setId(event){
    this.resumeService.setId(event.target.value);
    console.log(event.target.value)
    setTimeout(() => {
      this.router.navigate(['../discussion']);
    },
    1500);
  }

  setUpPage() {

  }

}
