import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  constructor(private resumeService: ResumeService, private http: HttpClient) { }

  springURL = "http://class-a.hekiyou.academy:9917/resume/get/";
  resumeId = "";
  result;

  ngOnInit() {
    var id = this.resumeService.getId();
    var idURL = this.springURL + id;
    this.http.get<any>(idURL).subscribe(
      data  => {
        this.result = data.data;
        this.displayData();
        }
      
    );
    this.resumeId = id;
  }

  displayData(){
    console.log('result', this.result);
    
  }

}
