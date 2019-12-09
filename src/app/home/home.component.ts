import {
  Component,
  OnInit
} from '@angular/core';
import {
  ResumeService
} from '../resume-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resumes: Object
  constructor(private resumeService: ResumeService) {}
  ngOnInit() {
    this.resumeService.getAllResumes().subscribe(data => {
      this.resumes = data
      console.log(this.resumes);
    });
  }

}
