import { Voter } from './../../../../Models/Voter';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {
  voters: any = [];
  baseUrl = `https://localhost:7056/api/Voter`;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let req = this.http.get(this.baseUrl);
    req.subscribe({
      next: (data) => this.voters = data,
      error: (err) => console.log(err)
    });
    console.log(this.voters);
    
  }

}
