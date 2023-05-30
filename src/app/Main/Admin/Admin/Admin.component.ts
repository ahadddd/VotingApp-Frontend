import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoterComponent } from '../Voter/Voter.component';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToHome(){
    this.router.navigateByUrl('');
  }

  navigateToVoters(){
    this.router.navigate(['voters']);
  }

  navigateToCandidates(){
    this.router.navigateByUrl('/candidates');
  }

}
