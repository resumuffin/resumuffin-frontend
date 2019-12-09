import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient) { }

  id = "";
  getAllResumes(){
    return this.http.get('http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/resume/get/all')
  }
  setId(id)
  {
    this.id = id;
  }

  getId()
  {
    return this.id;
  }

}
