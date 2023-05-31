import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-City',
  templateUrl: './City.component.html',
  styleUrls: ['./City.component.css']
})
export class CityComponent implements OnInit {
  baseUrl = `https://localhost:7056/api/City`;
  cities: any = [];
  createForm !: FormGroup;
  updateForm !: FormGroup;
  createModal: boolean = false;
  updateModal: boolean = false;
  globalHolder: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
    })
  }

  getCities() {
    let req = this.http.get(this.baseUrl);
    req.subscribe({
      next: (data) => this.cities = data,
      error: (err) => console.log(err)
    });
  }

  createCity() {
    if (this.createModal) {
      if (this.createForm.invalid) {
        alert('Invalid data provided.');
      }
      else {
        let ctrl = this.createForm.controls;
        let c1 = {
          name: ctrl['name'].getRawValue()
        };
        let req = this.http.post(this.baseUrl, c1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });
      }
      this.createModal = !this.createModal;
    }
    else {
      this.createModal = !this.createModal;
    }
  }

  updateCity(i?: any) {
    if (this.updateModal) {
      if (this.updateForm.invalid) {
        alert('Invalid data provided.');
      }
      else {
        let ctrl = this.updateForm.controls;
        let c1 = {
          newName: ctrl['newName'].getRawValue()
        };
        let req = this.http.put(this.baseUrl + `/${this.cities[this.globalHolder]?.name}`, c1);
        req.subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        });
        this.globalHolder = null;
      }
      this.updateModal = !this.updateModal;
    }
    else {
      this.updateModal = !this.updateModal;
      this.updateForm = new FormGroup({
        name: new FormControl(`${this.cities[i].name}`),
        newName: new FormControl('', Validators.required)
      });
      this.globalHolder = i;
    }
  }

  deleteCity(i: any) {
    let req = this.http.delete(this.baseUrl+`/${this.cities[i].name}`);
    req.subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }

}
