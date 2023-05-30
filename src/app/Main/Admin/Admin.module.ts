import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { CandidateComponent } from './Candidate/Candidate.component';
import { VoterComponent } from './Voter/Voter.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AdminComponent
      },
      {
        path: 'candidates',
        component: CandidateComponent
      },
      {
        path: 'voters',
        component: VoterComponent
      }
    ])
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
