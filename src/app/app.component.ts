import { Component } from '@angular/core';
import { UserService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'finalproject';
    username: object;
    constructor (private user : UserService ){}
    ngOnInit() {
      this.user.getUser().subscribe(
        username => {
          this.username = username;
        }
      
      );
    }
}