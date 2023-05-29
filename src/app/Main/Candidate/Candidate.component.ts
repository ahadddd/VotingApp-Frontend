import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Candidate } from 'src/Models/Candidate';

@Component({
  selector: 'app-Candidate',
  templateUrl: './Candidate.component.html',
  styleUrls: ['./Candidate.component.css']
})
export class CandidateComponent implements OnInit {
  baseUrl: string = `https://localhost:7056/api/`;
  createModal: boolean = false;
  editModal: boolean = false;
  createForm !: FormGroup;
  candidates: any[] = [];
  globalHolder: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required)
    })
  }

  getCandidates() {
    let req = this.http.get<any>(this.baseUrl + 'Candidate');
    req.subscribe({
      next: (data) => {
        this.candidates = data;
        console.log(this.candidates);

      },
      error: (err) => console.log(err)
    })
  }

  addCandidate() {
    if (this.createModal) {
      if (this.createForm.invalid) {
        alert('Invalid Data entered.');
      }
      else {
        let ctrl = this.createForm.controls;
        let c1 = {

          "name": ctrl['name'].getRawValue(),
          "position": ctrl['position'].getRawValue(),
          "city": {
            "name":
              ctrl['city'].getRawValue(),
          }
        }
        let req = this.http.post(this.baseUrl + 'Candidate', c1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });
        let newReq = this.http.get<any>(this.baseUrl + 'Candidate');
        req.subscribe({
          next: (data: any) => {
            this.candidates = data;
            console.log(this.candidates);
          },
          error: (err) => console.log(err)
        });
        this.createForm.reset();
      }
      this.createModal = !this.createModal;
    }
    else {
      this.createModal = !this.createModal;
    }
  }

  deleteCandidate(i: any) {
    let deleteId = this.candidates[i].name;
    let req = this.http.delete(this.baseUrl + `Candidate/${deleteId}`);
    req.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
    this.candidates.splice(i, 1);
    console.log(this.candidates);
  }

  editCandidate(i?: any) {
    if(this.editModal) {
      if(this.createForm.invalid){
        alert('Incorrect data entered.');
      }
      else{
        let ctrl = this.createForm.controls;
        let c1 = {

          "name": ctrl['name'].getRawValue(),
          "position": ctrl['position'].getRawValue(),
          "city": {
            "name":
              ctrl['city'].getRawValue(),
          }
        }
        let req = this.http.put(this.baseUrl+`Candidate/${this.candidates[this.globalHolder]?.name}`, c1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        })
        this.globalHolder = null;
      }
      this.editModal = !this.editModal;
    }
    else {
      //if modal close, open modal and load form data
      this.createForm = new FormGroup({
        name: new FormControl(`${this.candidates[i].name}`, Validators.required),
        city: new FormControl(`${this.candidates[i].city?.name}`, Validators.required),
        position: new FormControl(`${this.candidates[i].position}`, Validators.required)
      })
      this.editModal = !this.editModal;
      //hold on to key
      this.globalHolder = i;
    }
  }



}
