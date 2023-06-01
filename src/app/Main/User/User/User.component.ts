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
  navigateToVote() {
    this.router.navigateByUrl('/user');
  }

  castVote() {
    let vote: any;
    let voteUrl = `https://localhost:7056/vote/Vote`;
    let voterUrl = `https://localhost:7056/api/Voter/voter/castVote` //append voterName/castVote
    let candidateUrl = `https://localhost:7056/api/Candidate/candidate/castVote` //append candidateName/castVote
    if (this.voteForm.invalid) {
      alert('Invalid data provided.');
    }
    else {
      let ctrl = this.voteForm.controls;
      vote = {
        casted: true,
        voter: ctrl['voter'].getRawValue(),
        candidate: ctrl['candidate'].getRawValue()
      };
      console.log(vote);
      this.voteForm.reset();
    }

    let voterName;
    this.voters.forEach((item: any) => {
      if (item.id == vote.voter) {
        voterName = item.name;
      }
    });
    console.log(voterName);


    let candidateName;
    this.candidates.forEach((item: any) => {
      if (item.id == vote.candidate) {
        candidateName = item.name;
      }
    });
    console.log(candidateName);


    let req1 = this.http.post(voteUrl, vote);
    req1.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });


    setTimeout(() => {
      this.http.put(candidateUrl, vote).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      });
    }, 2000);

    setTimeout(() => {
      this.http.put(voterUrl, vote).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      });
    }, 1000);


  }



}
