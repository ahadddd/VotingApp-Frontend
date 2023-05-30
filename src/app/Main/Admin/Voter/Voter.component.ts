import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Voter',
  templateUrl: './Voter.component.html',
  styleUrls: ['./Voter.component.css']
})
export class VoterComponent implements OnInit {

  baseUrl = `https://localhost:7056/api/`;
  voters: any = [];
  createModal: boolean = false;
  createForm!: FormGroup;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })
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
        alert('invalid data entered.')
      }
      this.createModal = !this.createModal;
    }
    else {
      this.createModal = !this.createModal;
    }
  }

}
