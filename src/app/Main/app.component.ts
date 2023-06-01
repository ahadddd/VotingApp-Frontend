import { Component } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'VotingApp-Frontend';
  app = true;


  NavigateToAdmin() {
    this.app = false;
    this.router.navigate(['/admin']);
  }
  NavigateToUser() {
    this.app = false;
    this.router.navigate(['/user']);
  }
}
