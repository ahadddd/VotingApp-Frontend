import { City } from './../../../../Models/City';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LinearScale, BarController, CategoryScale } from "chart.js";
import { Chart } from 'chart.js/auto';
import { plugins } from 'chart.js';


@Component({
  selector: 'app-Results',
  templateUrl: './Results.component.html',
  styleUrls: ['./Results.component.css', '../../../../styles.css']
})
export class ResultsComponent implements OnInit {
  city: any = false;
  position: any = false;
  ch1!: Chart;
  ch2!: Chart;
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
  selectedCity: any;
  voters: any = [];
  selectedVoters = [];
  voted: any;
  nonVoted: any;
  leadingCongressman: any = 0;
  leadingSenator: any = 0;
  secOfState: any;
  president: any;
  constructor(private router: Router, private http: HttpClient) { }


  ngOnInit() {
    this.cityForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.http.get<any>(`https://localhost:7056/api/Voter`).subscribe({
      next: (data) => this.voters = data,
      error: (err) => console.log(err)
    })

    this.http.get<any>(this.baseUrl).subscribe({
      next: (data) => this.candidates = data,
      error: (err) => console.log(err)
    });
    setTimeout(() => {
      this.createChart();
    }, 500)

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
    if (this.selectedCity != null || undefined) {

      this.selectedVoters = [];
      this.voted = [];
      this.nonVoted = [];
      
      let congressmanVotes = 0;
      this.candidates.filter((item: any) => item.position == "Congressman" && item.city == this.selectedCity).forEach((item: any) => {
        if (item.votes.length > congressmanVotes) {
          congressmanVotes = item.votes.length;
          this.leadingCongressman = item;
        }
      });
      console.log(this.leadingCongressman);

      let senatorVotes = 0;
      this.candidates.filter((item: any) => item.position == "Senator" && item.city == this.selectedCity).forEach((item: any) => {
        if (item.votes.length > senatorVotes) {
          senatorVotes = item.votes.length;
          this.leadingSenator = item;
        }
      });
      console.log(this.leadingSenator);

      let secOfStateVotes = 0;
      this.candidates.filter((item: any) => item.position=="Congressman").forEach((item: any) => {
        if(item.votes.length > secOfStateVotes){
          secOfStateVotes = item.votes.length;
          this.secOfState = item;
        }
      });
      console.log("Leading SoS: ",this.secOfState);
      

      let presidentVotes = 0;
      this.candidates.filter((item: any) => item.position=="Senator").forEach((item: any) => {
        if(item.votes.length > presidentVotes){
          presidentVotes = item.votes.length;
          this.president = item;
        }
      });
      console.log("Leading president: ",this.president);
      


      this.selectedVoters = this.voters.filter((item: any) => item.city == this.selectedCity);
      this.voted = this.selectedVoters.filter((item: any) => item.voteCasted !== null || undefined);
      console.log("People who voted: ", this.voted);
      this.nonVoted = this.selectedVoters.filter((item: any) => item.voteCasted == null || undefined);
      console.log("People who didnt vote ", this.nonVoted);
      


      const canvas: HTMLCanvasElement = document.getElementById('chart1') as HTMLCanvasElement;
      const canvas2: HTMLCanvasElement = document.getElementById('chart2') as HTMLCanvasElement;
      const chart1: CanvasRenderingContext2D | null = canvas.getContext('2d');
      const chart2: CanvasRenderingContext2D | null = canvas2.getContext('2d');

      if (this.ch1 != undefined && this.ch2 != undefined) {
        this.ch1.destroy();
        this.ch2.destroy();
      }

      Chart.register(LinearScale, BarController, CategoryScale);
      this.ch1 = new Chart(chart1!, {
        type: 'bar',
        data: {
          labels: this.candidates.filter((item: any) => item.city == `${this.selectedCity}` && item.position == "Congressman").map((item: any) => item.name),
          datasets: [{
            label: `${this.selectedCity} Congressman Results`,
            data: this.candidates.filter((item: any) => item.city == this.selectedCity && item.position == "Congressman").map((item: any) => item.votes.length),
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 1)',
            barPercentage: 0.5
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            },
            x: {
              ticks: {
                align: 'center',
                font: {
                  size: 9
                }
              }
            },
          },
        }
      });

      Chart.register(LinearScale, BarController, CategoryScale);
      this.ch2 = new Chart(chart2!, {
        type: 'bar',
        data: {
          labels: this.candidates.filter((item: any) => item.city == `${this.selectedCity}` && item.position == "Senator").map((item: any) => item.name),
          datasets: [{
            label: `${this.selectedCity} Senator Results`,
            data: this.candidates.filter((item: any) => item.city == this.selectedCity && item.position == "Senator").map((item: any) => item.votes.length),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: 10,
          }]
        },
        options: {
          plugins: {
            colors: {
              
            }
          },
          
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        },
      });
    }


  }


  // sortByPosition() {
  //   if (this.city == true) {
  //     this.candidatesByPosition = [];
  //     this.city = false;
  //     this.position = true;

  //     console.log(this.positionFilter);
  //     this.candidates.forEach((item: any) => {
  //       if (item.position == this.positionFilter) {
  //         this.candidatesByPosition.push(item);
  //       }
  //     });
  //     console.log(this.candidatesByPosition);
  //   }
  //   else {
  //     this.candidatesByPosition = [];
  //     this.position = true;
  //     console.log(this.positionFilter);
  //     this.candidates.forEach((item: any) => {
  //       if (item.position == this.positionFilter) {
  //         this.candidatesByPosition.push(item);
  //       }
  //     });
  //     console.log(this.candidatesByPosition);
  //   }
  // }
}
