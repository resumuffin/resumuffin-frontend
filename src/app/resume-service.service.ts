import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient) { }

  id = "";
  // getTenResumes(){
  //   return this.http.get('http://class-a.hekiyou.academy:9917/tag/get/all')
  // }
  setId(id)
  {
    this.id = id;
  }

  getId()
  {
    return this.id;
  }

}
