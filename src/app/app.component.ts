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
      return (document.cookie.match(/^(?:.*;)?\s*resumuffin-frontend.s3-website-us-west-1.amazonaws.com\s*=\s*([^;]+)(?:.*)?$/)||[,0])[1];
    }
}