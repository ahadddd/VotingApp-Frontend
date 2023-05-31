import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../Admin/Admin/Admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CandidateComponent } from './Candidate/Candidate.component';
import { VoterComponent } from './Voter/Voter.component';
import { CityComponent } from './City/City.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
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
      },
      {
        path: 'cities',
        component: CityComponent
      }
    ])
  ],
  declarations: [AdminComponent, CandidateComponent, VoterComponent, CityComponent]
})
export class AdminModule { }
