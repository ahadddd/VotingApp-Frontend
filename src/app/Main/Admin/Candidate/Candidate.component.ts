import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  cities: any = ["Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Peshawar",
    "Quetta",
    "Gujranwala",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Abbottabad",
    "Gujrat",
    "Sukkur",
    "Jhelum",
    "Mardan",
    "Mirpur",
    "Rahim Yar Khan"];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required)
    })
  }
  navigateToCandidates() {
    this.router.navigateByUrl('/admin/candidates');
  }
  navigateToVoters() {
    this.router.navigateByUrl('/admin/voters');
  }

  getCandidates() {
    let req = this.http.get<any>(this.baseUrl + 'Candidate');
    req.subscribe({
      next: (data) => {
        this.candidates = data;
        // console.log(this.candidates);

      },
      error: (err) => console.log(err)
    })
  }

  addCandidate() {
    //if modal is already open:
    if (this.createModal) {

      if (this.createForm.invalid) {
        alert('Invalid Data entered.');
      }
      //extract form data, create object
      else {
        let ctrl = this.createForm.controls;
        let c1 = {
          "name": ctrl['name'].getRawValue(),
          "position": ctrl['position'].getRawValue(),
          "city": ctrl['city'].getRawValue(),
        };
        console.log(c1);

        //send post req with object
        let req = this.http.post(this.baseUrl + 'Candidate', c1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });

        this.createForm.reset();
      }

      this.createModal = !this.createModal;
    }
    //if modal is closed:
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
    // console.log(this.candidates);
  }

  editCandidate(i?: any) {

    if (this.editModal) {
      if (this.createForm.invalid) {
        alert('Incorrect data entered.');
      }
      else {
        console.log(this.globalHolder);

        let ctrl = this.createForm.controls;
        let c1 = {

          "name": ctrl['name'].getRawValue(),
          "position": ctrl['position'].getRawValue(),
          "city": {
            "name":
              ctrl['city'].getRawValue(),
          }
        }
        let req = this.http.put(this.baseUrl + `Candidate/${this.candidates[this.globalHolder]?.name}`, c1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });

        let req2 = this.http.get<any>(this.baseUrl + `Candidate/${this.candidates[this.globalHolder]?.name}`);
        req2.subscribe({
          next: (data) => {
            console.log(data);
            this.candidates.splice(this.globalHolder, 1);
            this.candidates.push(data);
          },
          error: () => console.log('Errorrrr')
        });
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
