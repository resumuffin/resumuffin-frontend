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

  resumeURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/resume/get/"; // Get resume endpoint
  commentURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/comment/createComment"; // Comment upload endpoint
  threadURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/comment/getThread/"; // Get comments associated with resume endpoint
  usernameURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/getUserDetailsById/"; // Get user info endpoint
  deleteCommentURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/comment/deleteComment/"; // Delete comment endpoint
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

  isAdmin; // Determines if currently logged in user is admin

  ngOnInit() {
    if (localStorage.getItem("IS_ADMIN"))
    {
      this.isAdmin = true;
    }
    this.getResume();
  }

  // Gets resume data from DB
  getResume(){
    // Get resume ID from local storage
    var id = localStorage.getItem("id");
    
    // Create URL to get specific resume from DB
    var idURL = this.resumeURL + id;
    this.http.get<any>(idURL).subscribe(
      // Get resume data from DB return
      data  => {
        this.resume = data.data;
        this.image = data.image;
        this.tags = data.tags;
        this.title = data.title;
        this.description = data.description;
        this.owner = data.owner;

        // Set up page with resume data
        this.setUpPage();
        }
      
    );
    this.resumeId = id;
  }

  getHomepageResume(){
    var id = this.resumeService.getId();
    var idURL = this.resumeURL + id;
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

  // Sets up page with dynamic data
  setUpPage(){
    
    var holdComments = [];
    var holdUsernames = [];

    // Create URL to get comments from specific resume
    var resumeThreadURL = this.threadURL + localStorage.getItem("id");

    // Create URL to get username of user that uploaded resume
    var getOwnerUsernameURL = this.usernameURL + this.owner;

    // HTTP call to get and store resume uploader username
    this.http.get<any>(getOwnerUsernameURL).subscribe(
      (data) => {
        this.ownerUsername = data.username;
      }
    );

    // HTTP call to get comments from a certain resume ID
    this.http.get<any>(resumeThreadURL).subscribe(
      (data) => {
        holdComments = data;

        // Shift comment array left by 1, removing first comment which is duplicate resume data
        holdComments.shift();

        // Set comment array to left shifted comment array from DB
        this.comments = holdComments;
        console.log(data);
      }
    );

    // Delay get usernames from DB to make sure comments come from DB first 
    setTimeout(()=>{

      // Iterate through comments and get username for uploader of each comment
      for (var i = 0; i < this.comments.length; i++)
      {

        // Create URL to get specific username as comment poster ID
        var getUsernameURL = this.usernameURL + this.comments[i].userId;

        // HTTP call to get and store username for a comment in array
        this.http.get<any>(getUsernameURL).subscribe(
          (data) => {
            holdUsernames.push(data.username);
          }
        );
      }

      // Delay set comment poster username to make sure usernames return from DB first
      setTimeout(()=>{
        // Iterate through comments and set title attribute to username of poster
        for (var j = 0; j < this.comments.length; j++)
        {
          this.comments[j].title = holdUsernames[j];
        }
      }, 300)
    }, 200);

    
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

  // Adds comment to current resume
  addComment(comment){
    
    // Gets current resume ID from local storage
    var id = localStorage.getItem("id");

    // Makes string resume ID into numerical value
    var numId = parseInt(id);

    // Make comment text and resume ID into JSON 
    var params = JSON.stringify({"description": comment,"resumeId": numId});

    setTimeout(() => {

      // HTTP call to add comment to resume
      this.http.post<any>(this.commentURL, params, { 
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        withCredentials: true
      }).subscribe(
      data  => {
        console.log(data);
        // Run page set up again to add new comment to current display
        this.setUpPage();
      }
      );
    }, 200);
    
  }

  deleteComment(event){
    var commentToDelete = event.target.value;
    var adminUserId = localStorage.getItem("USER_ID");

    var deleteCommentIDURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/comment/deleteComment/" + commentToDelete + "/" + adminUserId;

    this.http.get<any>(deleteCommentIDURL).subscribe(
      data => {
        this.setUpPage();
      }
    )

  }

}
