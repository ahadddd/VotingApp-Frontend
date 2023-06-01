import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['../../../../styles.css', './User.component.css']
})
export class UserComponent implements OnInit {

  baseUrlCandidates = `https://localhost:7056/api/Candidate`;
  baseUrlVoters = `https://localhost:7056/api/Voter`;
  selectedCandidate: any;
  selectedVoter: any;
  candidates: any = [];
  voters: any = [];
  voteForm!: FormGroup;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    let req = this.http.get<any>(this.baseUrlCandidates);
    req.subscribe({
      next: (data) => { this.candidates = data },
      error: (err) => console.log(err)
    });
    let req2 = this.http.get<any>(this.baseUrlVoters);
    req2.subscribe({
      next: (data) => {
        data.forEach((item: any) => {
          if (item.voteCasted == null || false) {
            this.voters.push(item);
          }
        })
      },
      error: (err) => console.log(err)
    });
    console.log(this.voters);


    this.voteForm = new FormGroup({
      candidate: new FormControl('', Validators.required),
      voter: new FormControl('', Validators.required)
    });


  }

  navigateToCandidates() {
    this.router.navigateByUrl('/user/candidates');
  }
  navigateToResults() {
    this.router.navigateByUrl('/user/results');
  }

  castVote() {
    let vote: any;
    let candidate: any;
    let voter: any;
    if (this.voteForm.invalid) {
      alert('Invalid data provided.');
    }
    else {
      let ctrl = this.voteForm.controls;
      vote = {
        casted: true,
        votedBy: ctrl['voter'].getRawValue(),
        votedFor: ctrl['candidate'].getRawValue()
      };
      console.log(vote);
    }
    //extract candidate from Vote
    this.candidates.forEach((item: any) => {
      if (item.id == vote.candidate) {
        candidate = item;
      }
    });

    //extract voter from Vote
    this.voters.forEach((item: any) => {
      if (item.id == vote.voter) {
        voter = item;
      }
    });

    console.log(candidate, voter);
  }


}
