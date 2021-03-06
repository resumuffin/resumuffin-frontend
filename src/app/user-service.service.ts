import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private ref: ApplicationRef) { }
  
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
		let params = JSON.stringify({"username":username, "password":password});
    let authenticate = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/authenticate/";
		return this.http.post(authenticate, params, {headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true}).subscribe(
			data => {
				console.log(data);
				if(data["username"]){
					localStorage.setItem("USERNAME", data["username"]);
					localStorage.setItem("USER_ID", data["id"]);
				}
				if(data["role"]["canDeleteComments"]) {
					localStorage.setItem("IS_ADMIN", "true");
				}
				this.ref.tick();
			}
		);
  }

  register(email, username, password){
    const register = "http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/addUser/";
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const postBody = JSON.stringify({"email": email,"username": username,"password": password})
    return this.http.post<any>(register, postBody, config).subscribe();
  }
  
  getThreads(){
    return this.http.get("http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/comment/get/user/"+localStorage.getItem("USER_ID"));
  }

  getUsers(){
    return this.http.get('http://springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com/users/get/all');
  }
}
