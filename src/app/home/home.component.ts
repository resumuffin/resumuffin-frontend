import {
  Component,
  OnInit
} from '@angular/core';
import {
  ResumeService
} from '../resume-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resumes: Object
  constructor(private resumeService: ResumeService, private router: Router) {}
  ngOnInit() {
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

}
