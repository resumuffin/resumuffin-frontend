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
  resume; // Base64 resume data
  image; // Bool for whether data is image or pdf
  tags; // Tags related to resume
  resSrc = ""; // Data type + base64 data for element source

  ngOnInit() {
    this.getResume();
  }

  getResume(){
    var id = this.resumeService.getId();
    
    id = localStorage.getItem("id"); 
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
      data  => console.log(data)
      );
    }, 500);
    
  }

}
