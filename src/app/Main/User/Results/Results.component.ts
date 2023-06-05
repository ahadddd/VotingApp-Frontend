import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  LinearScale, BarController, CategoryScale } from "chart.js";
import {Chart} from 'chart.js/auto';


@Component({
  selector: 'app-Results',
  templateUrl: './Results.component.html',
  styleUrls: ['./Results.component.css', '../../../../styles.css']
})
export class ResultsComponent implements OnInit {
  city: any = false;
  position: any = false;
  candidates: any = [];
  candidatesByCity: any = [];
  candidatesByPosition: any = [];
  cities: any = ["New York",
    "California",
    "Ohio",
    "Texas",
    "Michigan",
    "Washington",
    "Arizona",
    "Pennsylvania"
  ];
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
        console.log(city);
        this.candidates.forEach((item: any) => {
          if (item.city == city) {
            this.candidatesByCity.push(item);
          }
        });
        console.log(this.candidatesByCity);

      }
    }
    else {
      this.city = true;
      if (this.cityForm.invalid) {
        alert('Invalid city selected.');
      }
      else {
        let ctrl = this.cityForm.controls;
        let city = ctrl['name'].getRawValue();
        console.log(city);
        this.candidates.forEach((item: any) => {
          if (item.city == city) {
            this.candidatesByCity.push(item);
          }
        });
        console.log(this.candidatesByCity);
      }
    }
  }

  createChart(): void {
    const canvas: HTMLCanvasElement = document.getElementById('chart') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ctx) {
      Chart.register(LinearScale, BarController, CategoryScale);
      
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.candidates.filter((item: any) => item.name), 
          datasets: [{
            label: 'Data',
            data: this.candidates.filter((item: any) => item.votes.length), 
            backgroundColor: 'rgba(75, 192, 192, 0.6)', 
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

  }



  sortByPosition() {
    if (this.city == true) {
      this.candidatesByPosition = [];
      this.city = false;
      this.position = true;

      console.log(this.positionFilter);
      this.candidates.forEach((item: any) => {
        if (item.position == this.positionFilter) {
          this.candidatesByPosition.push(item);
        }
      });
      console.log(this.candidatesByPosition);
    }
    else {
      this.candidatesByPosition = [];
      this.position = true;
      console.log(this.positionFilter);
      this.candidates.forEach((item: any) => {
        if (item.position == this.positionFilter) {
          this.candidatesByPosition.push(item);
        }
      });
      console.log(this.candidatesByPosition);
    }
  }
}
