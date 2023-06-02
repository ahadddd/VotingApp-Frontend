import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit() {
    console.log("Admin component loaded.");
  }
  navigateToCandidates(){
    this.router.navigateByUrl('/admin/candidates');
  }
  navigateToVoters(){
    this.router.navigateByUrl('/admin/voters');
  }
  navigateToCities(){
    this.router.navigateByUrl('/admin/cities');
  }

}
