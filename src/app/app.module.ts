import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule } from "@angular/router";
import { AppComponent } from '../app/Main/app.component';
import { CandidateComponent } from './Main/Candidate/Candidate.component';

@NgModule({
  declarations: [
    AppComponent, CandidateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'candidates',
        component: CandidateComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
