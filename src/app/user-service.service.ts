import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  name = "";

  setName(name)
  {
    this.name = name;
  }

  getName()
  {
    return this.name;
  }

  auth(username, password){
    let authenticate = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/authenticate/" + username + "/" + password;
    return this.http.get(authenticate);
  }

  register(email, username, password){
    let register = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/addUser/"+email+"/"+username+"/"+password;
    return this.http.get(register);
  }
}
