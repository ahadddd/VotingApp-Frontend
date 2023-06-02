import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../User/User/User.component';
import { RouterModule } from '@angular/router';
import { CandidatesComponent } from './Candidates/Candidates.component';
import { ResultsComponent } from './Results/Results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: UserComponent
      },
      {
        path: 'candidates',
        component: CandidatesComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      }
    ])
  ],
  declarations: [UserComponent, CandidatesComponent, ResultsComponent]
})
export class UserModule { }
