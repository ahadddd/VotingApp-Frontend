import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css', '../../../../styles.css']
})
export class UserComponent implements OnInit {

  baseUrlCandidates = `https://localhost:7056/api/Candidate`;
  baseUrlVoters = `https://localhost:7056/api/Voter`;
  selectedCandidate: any;
  selectedVoter: any;
  candidates: any = [];
  voters: any = [];
  selectedCity: any;
  filterCandidates: any = [];
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
          if (item.voteCasted == null) {
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

  selectVoter() {
    let vote: any;
    let voteUrl = `https://localhost:7056/vote/Vote`;
    let voterUrl = `https://localhost:7056/api/Voter/voter/castVote` //append voterName/castVote
    let candidateUrl = `https://localhost:7056/api/Candidate/candidate/castVote` //append candidateName/castVote
    if (this.selectedCity == undefined) {
      alert('Invalid data provided.');
    }
    else {
      console.log(this.selectedCity);
      this.filterCandidates = this.candidates.filter((item: any) => item.city == this.selectedCity);
      console.log(this.filterCandidates);
      
      // let ctrl = this.voteForm.controls;
      // vote = {
      //   casted: true,
      //   voter: ctrl['voter'].getRawValue(),
      //   candidate: ctrl['candidate'].getRawValue()
      // };
      
      // this.voteForm.reset();
    }

    //check voter
    

    //check candidate
    

    //create vote
    // this.http.post(voteUrl, vote).subscribe({
    //   next: (res) => console.log(res),
    //   error: (err) => console.log(err)
    // });

    //link to candidate
    // setTimeout(() => {
    //   this.http.put(candidateUrl, vote).subscribe({
    //     next: (res) => console.log(res),
    //     error: (err) => console.log(err)
    //   });
    // }, 2000);

    //link to voter
    // setTimeout(() => {
    //   this.http.put(voterUrl, vote).subscribe({
    //     next: (res) => console.log(res),
    //     error: (err) => console.log(err)
    //   });
    // }, 2000);
  }


  castVote(){

  }



}
