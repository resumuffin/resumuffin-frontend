import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUser() {
    var query = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/getUser?username=" + "cohale";
    return this.http.get(query);
  }
}
