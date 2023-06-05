import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Voter',
  templateUrl: './Voter.component.html',
  styleUrls: ['./Voter.component.css']
})
export class VoterComponent implements OnInit {

  baseUrl = `https://localhost:7056/api/`;
  voters: any = [];
  createModal: boolean = false;
  editModal: boolean = false;
  createForm!: FormGroup;
  globalHolder: any;
  cities: any = ["Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Peshawar",
    "Quetta",
  ];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })
  }
  navigateToCandidates() {
    this.router.navigateByUrl('/admin/candidates');
  }
  navigateToVoters() {
    this.router.navigateByUrl('/admin/voters');
  }

  getVoters() {
    let req = this.http.get<any>(this.baseUrl + 'Voter');
    req.subscribe({
      next: (data) => this.voters = data,
      error: (err) => console.log(err)
    })
  }

  addVoter() {
    if (this.createModal) {
      if (this.createForm.invalid) {
        alert('invalid data entered.');
        this.createModal = !this.createModal;
      }
      else {
        let ctrl = this.createForm.controls;
        let v1 = {
          "name": ctrl['name'].getRawValue(),
          "city": ctrl['city'].getRawValue()
        };
        console.log(v1);
        let req = this.http.post(this.baseUrl + 'Voter', v1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });
        this.createForm.reset();
        this.createModal = !this.createModal;
      }
    }
    else {
      this.createModal = !this.createModal;
    }
  }

  editVoter(i?: any) {

    if (this.editModal) {
      if (this.createForm.invalid) {
        alert('Invalid data entered.');
      }
      else {
        let ctrl = this.createForm.controls;
        let v1 = {
          "name": ctrl['name'].getRawValue(),
          "city": ctrl['city'].getRawValue()
        }
        let req = this.http.put(this.baseUrl + `Voter/${this.voters[this.globalHolder].name}`, v1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });
        this.globalHolder = null;
      }
      this.editModal = !this.editModal;
    }
    else {
      this.createForm = new FormGroup({
        name: new FormControl(`${this.voters[i].name}`, Validators.required),
        city: new FormControl(`${this.voters[i].city?.name}`, Validators.required),
      });
      this.editModal = !this.editModal;
      this.globalHolder = i;
    }
  }

  deleteVoter(i: any) {
    let req = this.http.delete(this.baseUrl + `Voter/${this.voters[i].name}`);
    req.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
    this.voters.splice(i, 1);
  }
}
