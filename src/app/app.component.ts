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
      return (document.cookie.match(/^(?:.*;)?\s*springuserandcomments-env.sfredvy8k7.us-west-1.elasticbeanstalk.com\s*=\s*([^;]+)(?:.*)?$/)||[,0])[1]
    }
}