import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private http: HttpClient) { }

  tag = "";
  getAllTags(){
    return this.http.get('http://class-a.hekiyou.academy:9917/tag/get/all')
  }
  
  setTag(tag)
  {
    this.tag = tag;
  }

  getTag()
  {
    return this.tag;
  }

}
