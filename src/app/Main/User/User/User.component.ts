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
  selectedVoter: any;
  candidates: any = [];
  voters: any = [];
  selectedCity: any;
  filterCandidates: any = [];
  senators: any = []
  congressmen: any = [];
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
      senator: new FormControl('', Validators.required),
      congressman: new FormControl('', Validators.required),
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
    //append candidateName/castVote
    if (this.selectedVoter == undefined) {
      alert('Invalid data provided.');
    }
    else {
      this.voters.forEach((item: any) => {
        if (item.id == this.selectedVoter) {
          this.selectedCity = item.city;
        }
      });

      //CHECKS 
      this.voters.forEach((item: any) => {
        if (item.id == this.selectedVoter) {
          console.log("Selected Voter: ", item.name);
          ;
        }
      });
      console.log("Selected City: ", this.selectedCity);
      this.filterCandidates = this.candidates.filter((item: any) => item.city == this.selectedCity);
      console.log(`Candidates from ${this.selectedCity} `, this.filterCandidates);
      this.senators = this.filterCandidates.filter((item: any) => item.position == 'Senator');
      console.log(`Senators from ${this.selectedCity}`, this.senators);
      this.congressmen = this.filterCandidates.filter((item: any) => item.position == 'Congressman');
      console.log(`Congressmen from ${this.selectedCity}`, this.congressmen);

      //CHECKS
    }

  }


  castVote() {
    let vote: any;
    let voteUrl = `https://localhost:7056/vote/Vote`;
    let voterUrl = `https://localhost:7056/api/Voter/voter/castVote` //append voterName/castVote
    let candidateUrl = `https://localhost:7056/api/Candidate/candidate/castVote`

    if (this.voteForm.invalid) {
      alert('Invalid vote casted.')
    }
    else {
      let ctrl = this.voteForm.controls;
      vote = {
        casted: true,
        voter: this.selectedVoter,
        senator: ctrl['senator'].getRawValue(),
        congressman: ctrl['congressman'].getRawValue(),
      };
      console.log(vote);
      this.voteForm.reset();

      // create vote
      this.http.post(voteUrl, vote).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      });

      // link to candidate
      setTimeout(() => {
        this.http.put(candidateUrl, vote).subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });
      }, 2000);

      // link to voter
      setTimeout(() => {
        this.http.put(voterUrl, vote).subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });
      }, 2000);

      this.selectedVoter = null;
      this.selectedCity = null;
    }



  }



}
