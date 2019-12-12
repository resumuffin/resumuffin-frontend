import { Component, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'finalproject';
    constructor (private ref: ApplicationRef){}
    ngOnInit() {
      
    }
    
    isLoggedIn() {
      return localStorage.getItem("USERNAME");
		}

		logout() {
			localStorage.clear();
			sessionStorage.clear();
			this.ref.tick();
		}
}