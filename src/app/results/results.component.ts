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
    this.resumeService.setId(id);

  }

  ngOnInit() {
  }

}
