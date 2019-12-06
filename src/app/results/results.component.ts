import { Component, OnInit } from '@angular/core';
import { ResumeService } from "../resume-service.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private resumeService: ResumeService) { }

  setId(event){

    var id = event.target.text;

    // using value of tag instead of tag text
    // var id = event.target.value
    // value="1" == value of resume as attribute of html tag

    this.resumeService.setId(id);
    
    localStorage.setItem("id", id);

  }

  ngOnInit() {
  }

}
