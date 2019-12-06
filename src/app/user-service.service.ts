import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  name = "";

  setName(name)
  {
    this.name = name;
  }

  getName()
  {
    return this.name;
  }

}
