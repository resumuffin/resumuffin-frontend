import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor() { }

  id = "";

  setId(id)
  {
    this.id = id;
  }

  getId()
  {
    return this.id;
  }

}
