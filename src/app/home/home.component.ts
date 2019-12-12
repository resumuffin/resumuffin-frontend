import {
  Component,
  OnInit
} from '@angular/core';
import {
  ResumeService
} from '../resume-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  deleteResumeURL = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/resume/delete/";
  isAdmin;
  resumes: Object
  constructor(private resumeService: ResumeService, private router: Router, private http: HttpClient) {}
  ngOnInit() {
    if (localStorage.getItem("IS_ADMIN"))
    {
      this.isAdmin = true;
    }
    this.setUpPage();
  }
  setUpPage(){
    this.resumeService.getAllResumes().subscribe(data => {
      this.resumes = data
      console.log(this.resumes);
    });
  }
  setId(event){
    this.resumeService.setId(event.target.value);
    console.log(event.target.value)
    setTimeout(() => {
      this.router.navigate(['../discussion']);
    },
    1500);
  }
  deleteResume(event){
    var id = event.target.value;
    var deleteResumeURLID = this.deleteResumeURL + id;
    this.http.delete<any>(deleteResumeURLID, {withCredentials: true}).subscribe(
      (data) => {
        console.log(data);
        this.setUpPage();
      }
    );
  }

}
