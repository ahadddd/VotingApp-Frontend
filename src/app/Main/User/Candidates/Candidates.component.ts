import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Candidates',
  templateUrl: './Candidates.component.html',
  styleUrls: ['../../../../styles.css', './Candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  baseUrlCandidates = `https://localhost:7056/api/Candidate`;
  candidates: any = [];
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    let req = this.http.get<any>(this.baseUrlCandidates);
    req.subscribe({
      next: (data) => { this.candidates = data },
      error: (err) => console.log(err)
    });
  }

  navigateToCandidates() {
    this.router.navigateByUrl('/user/candidates');
  }
  navigateToResults() {
    this.router.navigateByUrl('/user/results');
  }
  navigateToVote() {
    this.router.navigateByUrl("/user");
  }

}
