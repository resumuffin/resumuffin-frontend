import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  constructor(private resumeService: ResumeService, private http: HttpClient) { }

  springURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/resume/get/"; // Resume endpoint
  commentURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/comment/createComment"; // Comment upload endpoint
  resumeId = ""; // ID number of currently viewed resume
  title = ""; // Title of resume
  description = ""; // Description of resume
  resume; // Base64 resume data
  image; // Bool for whether data is image or pdf
  tags; // Tags related to resume
  resSrc = ""; // Data type + base64 data for element source
  owner; // ID of user who uploaded resume
  ownerUsername; // Username of user who uploaded resume

  comments = []; // Stores all comments from db associated with current resume
  threadURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/comment/getThread/";
  usernameMap = new Map();
  usernameURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/getUserDetailsById/";

  ngOnInit() {
    this.getResume();
  }

  getResume(){
    var id = localStorage.getItem("id");//this.resumeService.getId();
    
    var idURL = this.springURL + id;
    this.http.get<any>(idURL).subscribe(
      data  => {
        this.resume = data.data;
        this.image = data.image;
        this.tags = data.tags;
        this.title = data.title;
        this.description = data.description;
        this.owner = data.owner;
        console.log("data",data);
        this.setUpPage();
        }
      
    );
    this.resumeId = id;
  }

  getHomepageResume(){
    var id = this.resumeService.getId();
    var idURL = this.springURL + id;
    this.http.get<any>(idURL).subscribe(
      data  => {
        this.resume = data.data;
        this.image = data.image;
        this.tags = data.tags;
        console.log("data",data);
        this.setUpPage();
        }
      
    );
    this.resumeId = id;
  }
  setUpPage(){
    var comments2 = this.comments;
    var holdComments = [];
    var holdUsernames = [];
    var resumeThreadURL = this.threadURL + localStorage.getItem("id");

    var getOwnerUsernameURL = this.usernameURL + this.owner;

    this.http.get<any>(getOwnerUsernameURL).subscribe(
      (data) => {
        this.ownerUsername = data.username;
      }
    );

    this.http.get<any>(resumeThreadURL).subscribe(
      (data) => {
        holdComments = data;
        //console.log("holdComments before shift:", holdComments);
        holdComments.shift();
        //console.log("holdComments after shift:", holdComments);
        this.comments = holdComments;
        //console.log(this.comments);
        console.log(data);
      }
    );
    setTimeout(()=>{
      for (var i = 0; i < this.comments.length; i++)
      {
        var getUsernameURL = this.usernameURL + this.comments[i].userId;
        console.log(getUsernameURL);
        this.http.get<any>(getUsernameURL).subscribe(
          (data) => {
            holdUsernames.push(data.username);
          }
        );
      }
      setTimeout(()=>{
        for (var j = 0; j < this.comments.length; j++)
        {
          this.comments[j].title = holdUsernames[j];
        }
      }, 300)
    }, 200);


    this.comments = comments2;
    //this.comments[i].title = data.username;

    this.resSrc = "";
    // Render page if resume is in image format
    if (this.image)
    {
      this.resSrc = "data:image/png;base64," + this.resume;
    }
    // Render page if resume is in PDF format
    else
    {
      this.resSrc = "data:application/pdf;base64," + this.resume;
    }
    
  }

  addComment(comment){
    
    var id = localStorage.getItem("id");
    var config = new HttpHeaders();
    var numId = parseInt(id);
    var params = JSON.stringify({"description": comment,"resumeId": numId});
    setTimeout(() => {
      this.http.post<any>(this.commentURL, params, { 
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true
      }).subscribe(
      data  => {
        console.log(data);
        this.setUpPage();
      }
      );
    }, 200);
    
  }

}
