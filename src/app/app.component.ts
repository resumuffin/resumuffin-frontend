import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'finalproject';
    constructor (){}
    ngOnInit() {
      
    }
    
    isLoggedIn(){
      return (document.cookie.match(/^(?:.*;)?\s*username-localhost-8888\s*=\s*([^;]+)(?:.*)?$/)||[,0])[1]
    }
}