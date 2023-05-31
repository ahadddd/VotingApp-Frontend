import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule } from "@angular/router";
import { AppComponent } from '../app/Main/app.component';
import { HttpClientModule } from "@angular/common/http";
import { CandidateComponent } from './Main/Admin/Candidate/Candidate.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoterComponent } from './Main/Admin/Voter/Voter.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'admin',
        loadChildren: () => import( `../app/Main/Admin/Admin.module`).then(module => module.AdminModule)
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
