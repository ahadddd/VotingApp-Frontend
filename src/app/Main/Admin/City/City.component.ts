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
      
    })
  }

}
