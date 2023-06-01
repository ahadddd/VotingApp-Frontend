import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Results',
  templateUrl: './Results.component.html',
  styleUrls: ['../../../../styles.css', './Results.component.css']
})
export class ResultsComponent implements OnInit {
  city: any = false;
  position: any = false;
  candidates: any = [];
  candidatesByCity: any = [];
  candidatesByPosition: any = [];
  cities: any = [];
  cityUrl: any = `https://localhost:7056/api/City`;
  baseUrl: any = `https://localhost:7056/api/Candidate`;
  cityForm!: FormGroup;
  positionForm!: FormGroup;
  positionFilter: any = '';
  constructor(private router: Router, private http: HttpClient) { }


  ngOnInit() {
    this.cityForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.http.get<any>(this.baseUrl).subscribe({
      next: (data) => this.candidates = data,
      error: (err) => console.log(err)
    });

    this.http.get<any>(this.cityUrl).subscribe({
      next: (data) => this.cities = data,
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
    this.router.navigateByUrl('/user');
  }

  sortByCity() {
    this.candidatesByCity = [];
    if (this.position == true) {
      this.position = false;
      this.city = true;
      if (this.cityForm.invalid) {
        alert('Invalid city selected.');
      }
      else {
        let ctrl = this.cityForm.controls;
        let city = ctrl['name'].getRawValue();
        this.candidates.forEach((item: any) => {
          if (item.city.name == city) {
            this.candidatesByCity.push(item);
          }
        });
      }
    }
    else{
      this.city = true;
      if (this.cityForm.invalid) {
        alert('Invalid city selected.');
      }
      else {
        let ctrl = this.cityForm.controls;
        let city = ctrl['name'].getRawValue();
        this.candidates.forEach((item: any) => {
          if (item.city.name == city) {
            this.candidatesByCity.push(item);
          }
        });
      }
    }
  }



  sortByPosition() {

  }
}
